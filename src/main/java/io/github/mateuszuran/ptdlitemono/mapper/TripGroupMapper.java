package io.github.mateuszuran.ptdlitemono.mapper;

import io.github.mateuszuran.ptdlitemono.config.ModelMapperConfig;
import io.github.mateuszuran.ptdlitemono.dto.TripGroupResponse;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripGroupMapper {
    private final ModelMapperConfig mapper;

    public TripGroupResponse mapToDto(TripGroup group) {
        return mapper.modelMapper().map(group, TripGroupResponse.class);
    }
}
