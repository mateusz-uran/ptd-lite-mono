package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import io.github.mateuszuran.ptdlitemono.exception.TripsEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.GenericMapper;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public void addManyTrips(List<TripRequest> trips, Long cardId) {
        var card = service.checkIfCardExists(cardId);
        List<Trip> tripToSave = new ArrayList<>();
        trips.forEach(
                tripValues -> {
                    var trip = tripMapper.mapToTrip(tripValues);
                    trip.setCarMileage(subtractCarMileage(tripValues.getCounterStart(), tripValues.getCounterEnd()));
                    card.addTrip(trip);
                }
        );
        repository.saveAll(tripToSave);
    }

    public void deleteSelectedTrips(List<Long> selectedTrips) {
        var result = repository.findAllByIdIn(selectedTrips).orElseThrow();
        repository.deleteAll(result);
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
