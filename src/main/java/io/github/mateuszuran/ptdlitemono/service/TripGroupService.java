package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripGroupResponse;
import io.github.mateuszuran.ptdlitemono.mapper.TripGroupMapper;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import io.github.mateuszuran.ptdlitemono.repository.TripGroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TripGroupService {
    private final TripGroupRepository repository;
    private final TripGroupMapper mapper;
    private final TripService service;

    public TripGroupResponse createGroupTrips(TripGroupRequest request) {
        TripGroup tripGroup = TripGroup.builder()
                .cargoName(request.getCargoName())
                .temperature(request.getTemperature())
                .weight(request.getWeight())
                .build();
        var result = repository.save(tripGroup);
        service.updateEachTripWithGroup(request.getTripsIds(), result);

        return TripGroupResponse.builder()
                .cargoName(result.getCargoName())
                .temperature(result.getTemperature())
                .weight(result.getWeight())
                .build();
    }

    public TripGroupResponse getGroup(Long groupId) {
        var group = repository.findById(groupId).orElseThrow(() -> new IllegalArgumentException("Group not found"));
        return mapper.mapToDto(group);
    }
}
