package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.TripRequest;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
                    card.addTrip(trip);
                    repository.save(trip);
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
}
