package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import io.github.mateuszuran.ptdlitemono.exception.TripsEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.GenericMapper;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
import io.github.mateuszuran.ptdlitemono.service.async.CardStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository repository;
    private final CardService service;
    private final TripMapper tripMapper;
    private final GenericMapper genericMapper;

    private final CardStatisticsService statistics;

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

    public TripResponse editSingleTrip(Long tripId, TripRequest request) {
        var tripToEdit = repository.findById(tripId).orElseThrow(TripsEmptyException::new);
        genericMapper.mergeTwoDifferentObjects(request, tripToEdit);
        var mileage = subtractCarMileage(tripToEdit.getCounterStart(), tripToEdit.getCounterEnd());
        tripToEdit.setCarMileage(mileage);
        var updatedTrip = repository.save(tripToEdit);
        return tripMapper.mapToTripResponse(updatedTrip);
    }

    private Integer subtractCarMileage(Integer min, Integer max) {
        return max - min;
    }
}
