package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.TripRequest;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository repository;
    private final CardService service;
    private final TripMapper tripMapper;

    public void addManyTips(List<TripRequest> trips, Long cardId) {
        var card = service.checkIfCardExists(cardId);

        List<Trip> tripsToSave = new ArrayList<>();
        trips.forEach(
                tripValues -> {
                    var trip = tripMapper.mapToTripValuesWithModelMapper(tripValues);
                    trip.setCarMileage(calculateCarMileage(tripValues.getCounterStart(), tripValues.getCounterEnd()));
                    card.getTrips().add(trip);
                    service.updateCard(card);
                    tripsToSave.add(trip);
                }
        );
        repository.saveAll(tripsToSave);
    }

    public void deleteSelected(List<Long> selectedTrips) {
        var result = repository.findAllByIdIn(selectedTrips).orElseThrow();
        repository.deleteAll(result);
    }

    public void updateEachTripWithGroup(List<Long> tripsIds, TripGroup group) {
        var trips = repository.findAllById(tripsIds);
        List<Trip> updatedTrips = new ArrayList<>();
        for (Trip trip : trips) {
            trip.setGroup(group);
            updatedTrips.add(trip);
        }
        repository.saveAll(updatedTrips);
    }

    private Integer calculateCarMileage(Integer min, Integer max) {
        return max - min;
    }
}
