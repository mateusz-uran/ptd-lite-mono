package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripGroupResponse;
import io.github.mateuszuran.ptdlitemono.exception.TripGroupNotFoundException;
import io.github.mateuszuran.ptdlitemono.exception.TripGroupException;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import io.github.mateuszuran.ptdlitemono.repository.TripGroupRepository;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TripGroupService {
    private final TripGroupRepository repository;
    private final TripRepository tripRepository;
    private final TripMapper mapper;

    public void createGroup(TripGroupRequest request) {
        var tripsToUpdate = tripRepository.findAllById(request.getTripIds());

        var tripHasGroup = checkIfTripHasGroup(tripsToUpdate);
        if (tripHasGroup) {
            throw new TripGroupException("Trip cannot have group.");
        }

        var mappedGroup = mapper.mapToTripGroup(request);
        for (Trip trip : tripsToUpdate) {
            mappedGroup.addTripsToGroup(trip);
        }
        repository.save(mappedGroup);
    }

    public void addTripToGroup(List<Long> tripIds, Long groupId) {
        var tripsToUpdate = tripRepository.findAllById(tripIds);
        var tripHasGroup = checkIfTripHasGroup(tripsToUpdate);
        if (tripHasGroup) {
            throw new TripGroupException("Trip cannot have group.");
        }
        var existingGroup = repository.findById(groupId).orElseThrow(TripGroupNotFoundException::new);
        for (Trip trip : tripsToUpdate) {
            existingGroup.addTripsToGroup(trip);
        }
        repository.save(existingGroup);
    }

    public void removeTripFromGroup(List<Long> tripIds, Long groupId) {
        var tripsToUpdate = tripRepository.findAllById(tripIds);
        var tripHasGroup = checkIfTripHasGroup(tripsToUpdate);
        if (!tripHasGroup) {
            throw new TripGroupException("Trip must be in group.");
        }
        var existingGroup = repository.findById(groupId).orElseThrow(TripGroupNotFoundException::new);
        var differentGroup = tripHasDifferentGroup(tripsToUpdate, existingGroup);
        if (differentGroup) {
            throw new TripGroupException("Selected trip has different group.");
        }
        for (Trip trip : tripsToUpdate) {
            existingGroup.removeTripsFromGroup(trip);
        }
        repository.save(existingGroup);
    }

    public void deleteTripGroup(Long groupId) {
        var groupToDelete = repository.findById(groupId).orElseThrow(TripGroupNotFoundException::new);
        repository.delete(groupToDelete);
    }

    public TripGroupResponse editTripGroupInformation(Long groupId, TripGroupRequest request) {
        var groupToEdit = repository.findById(groupId).orElseThrow(TripGroupNotFoundException::new);
        mapper.updateTrip(request, groupToEdit);
        var updatedGroup = repository.save(groupToEdit);
        return mapper.mapToTripGroupResponse(updatedGroup);
    }

    private static boolean tripHasDifferentGroup(List<Trip> tripsToUpdate, TripGroup existingGroup) {
        return tripsToUpdate.stream()
                .map(Trip::getTripGroup)
                .anyMatch(tripGroup -> !existingGroup.equals(tripGroup));
    }

    private static boolean checkIfTripHasGroup(List<Trip> tripsToUpdate) {
        return tripsToUpdate.stream().map(Trip::getTripGroup).anyMatch(Objects::nonNull);
    }
}
