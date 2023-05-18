package io.github.mateuszuran.ptdlitemono.mapper;

import io.github.mateuszuran.ptdlitemono.config.ModelMapperConfig;
import io.github.mateuszuran.ptdlitemono.dto.TripGroupDto;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripGroupMapper {
    private final ModelMapperConfig mapper;

    public TripGroup mapToTripGroup(TripGroupDto request) {
        return mapper.modelMapper().map(request, TripGroup.class);
    }

    public TripGroupDto mapToDto(TripGroup group) {
        return mapper.modelMapper().map(group, TripGroupDto.class);
    }
}
