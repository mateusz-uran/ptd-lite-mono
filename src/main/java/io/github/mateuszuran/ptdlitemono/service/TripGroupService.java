package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.exception.TripGroupNotFoundException;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import io.github.mateuszuran.ptdlitemono.repository.TripGroupRepository;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TripGroupService {
    private final TripGroupRepository repository;
    private final TripRepository tripRepository;

    public void createGroup(TripGroupRequest request) {
        var tripsToUpdate = tripRepository.findAllById(request.getTripIds());
        TripGroup group = new TripGroup();
        group.setCargoName(request.getCargoName());
        for (Trip trip : tripsToUpdate) {
            group.addTripsToGroup(trip);
        }
        repository.save(group);
    }

    public void addTripToGroup(TripGroupRequest request, Long groupId) {
        var tripsToUpdate = tripRepository.findAllById(request.getTripIds());
        var existingGroup = repository.findById(groupId).orElseThrow(TripGroupNotFoundException::new);
        for (Trip trip : tripsToUpdate) {
            existingGroup.addTripsToGroup(trip);
        }
        repository.save(existingGroup);
    }

    public void removeTripFromGroup(TripGroupRequest request, Long groupId) {
        var tripsToUpdate = tripRepository.findAllById(request.getTripIds());
        var existingGroup = repository.findById(groupId).orElseThrow(TripGroupNotFoundException::new);
        for (Trip trip : tripsToUpdate) {
            existingGroup.removeTripsFromGroup(trip);
        }
        repository.save(existingGroup);
    }
}
