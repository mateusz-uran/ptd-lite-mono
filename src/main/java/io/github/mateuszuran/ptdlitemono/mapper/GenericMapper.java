package io.github.mateuszuran.ptdlitemono.mapper;

import io.github.mateuszuran.ptdlitemono.config.ModelMapperConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GenericMapper {
    private final ModelMapperConfig mapper;

    public <T, V> void mergeTwoDifferentObjects(T source, V target) {
        mapper.modelMapper().map(source, target);
    }
}
