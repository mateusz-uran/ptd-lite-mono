package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripResponse;
import io.github.mateuszuran.ptdlitemono.exception.TripsEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository repository;
    private final CardService service;
    private final TripMapper tripMapper;

    public void addManyTips(List<TripRequest> trips, Long cardId) {
        var card = service.checkIfCardExists(cardId);
        trips.forEach(
                tripValues -> {
                    var trip = tripMapper.mapToTripValuesWithModelMapper(tripValues);
                    trip.setCarMileage(calculateCarMileage(tripValues.getCounterStart(), tripValues.getCounterEnd()));
                    card.getTrips().add(trip);
                    service.updateCard(card);
                }
        );
    }

    public void deleteSelected(List<Long> selectedTrips) {
        var result = repository.findAllByIdIn(selectedTrips).orElseThrow();
        repository.deleteAll(result);
    }

    private Integer calculateCarMileage(Integer min, Integer max) {
        return max - min;
    }

    public void addTripsToCard(List<TripRequest> trips, Long cardId) {
        var card = service.checkIfCardExists(cardId);
        trips.forEach(
                tripValues -> {
                    var trip = tripMapper.mapToTripValuesWithModelMapper(tripValues);
                    trip.setCarMileage(calculateCarMileage(tripValues.getCounterStart(), tripValues.getCounterEnd()));
                    card.addTrip(trip);
                    repository.save(trip);
                }
        );
    }

    public List<TripResponse> retrieveTripsFromCard(Long cardId) {
        var trips = repository.findAllTripsByCardId(cardId).orElseThrow(TripsEmptyException::new);
        if (trips.isEmpty()) {
            throw new TripsEmptyException();
        }
        return trips
                .stream()
                .map(tripMapper::mapToTripResponseWithModelMapper)
                .collect(Collectors.toList());
    }
}
