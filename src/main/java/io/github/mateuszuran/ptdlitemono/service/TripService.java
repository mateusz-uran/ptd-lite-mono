package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import io.github.mateuszuran.ptdlitemono.exception.TripsEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.GenericMapper;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
import io.github.mateuszuran.ptdlitemono.service.async.AsyncStatisticService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository repository;
    private final CardService service;
    private final TripMapper tripMapper;
    private final GenericMapper genericMapper;

    private final AsyncStatisticService statistics;

    public void addManyTrips(List<TripRequest> trips, Long cardId) {
        var card = service.checkIfCardExists(cardId);

        var tripsToSave = trips.stream().map(singleTrip -> {
            var trip = genericMapper.mapToEntityModel(singleTrip, Trip.class);
            var carMileage = subtractCarMileage(singleTrip.getCounterStart(), singleTrip.getCounterEnd());
            trip.setCarMileage(carMileage);
            card.addTrip(trip);
            return trip;
        }).toList();
        var savedTrips = repository.saveAll(tripsToSave);

        //async
        statistics.sumCarMileageInMonth(savedTrips, card.getUsername());
    }

    public void deleteSelectedTrips(List<Long> selectedTrips, String username) {
        var result = repository.findAllByIdIn(selectedTrips).orElseThrow();
        repository.deleteAll(result);
        //async
        statistics.removeCarMileageInMonth(result, username);
    }


    public List<TripResponse> getAllTripsFromCard(Long cardId) {
        var trips = repository.findAllTripsByCardId(cardId).orElseThrow(TripsEmptyException::new);
        if (trips.isEmpty()) {
            throw new TripsEmptyException();
        }
        return trips
                .stream()
                .map(tripMapper::mapToTripResponse)
                .sorted(Comparator.comparing(TripResponse::getCounterEnd))
                .collect(Collectors.toList());
    }

    public TripResponse editSingleTrip(Long tripId, TripRequest request, String username) {
        var tripToEdit = repository.findById(tripId).orElseThrow(TripsEmptyException::new);
        var storeTripToEditMileage = tripToEdit.getCarMileage();
        genericMapper.mergeTwoDifferentObjects(request, tripToEdit);
        var mileage = subtractCarMileage(tripToEdit.getCounterStart(), tripToEdit.getCounterEnd());
        tripToEdit.setCarMileage(mileage);
        var updatedTrip = repository.save(tripToEdit);
        //async - update card car mileage when mileage has changed
        if (!storeTripToEditMileage.equals(updatedTrip.getCarMileage())) {
            var tripDifference = updatedTrip.getCarMileage() - storeTripToEditMileage;
            statistics.updateCarMileageInMonth(updatedTrip, tripDifference, username);
        }
        return tripMapper.mapToTripResponse(updatedTrip);
    }

    public TripResponse getLastTripFromCard(Long cardId) {
        var lastTrip = repository.findTopByCardIdOrderByCounterEndDesc(cardId);
        return tripMapper.mapToTripResponse(lastTrip);
    }

    private Integer subtractCarMileage(Integer min, Integer max) {
        return max - min;
    }
}
