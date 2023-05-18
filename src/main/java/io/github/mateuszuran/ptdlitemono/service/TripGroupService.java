package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.TripGroupDto;
import io.github.mateuszuran.ptdlitemono.exception.GroupNotFoundException;
import io.github.mateuszuran.ptdlitemono.mapper.TripGroupMapper;
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

    public TripGroupDto createGroup(TripGroupDto request) {
        var groupToSave = mapper.mapToTripGroup(request);
        var savedGroup = repository.save(groupToSave);
        return mapper.mapToDto(savedGroup);
    }

    public TripGroupDto getGroup(String cargoName) {
        var result = repository.findByCargoName(cargoName)
                .orElseThrow(GroupNotFoundException::new);
        return mapper.mapToDto(result);
    }
}
