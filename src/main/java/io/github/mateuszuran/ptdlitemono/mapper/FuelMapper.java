package io.github.mateuszuran.ptdlitemono.mapper;

import io.github.mateuszuran.ptdlitemono.config.ModelMapperConfig;
import io.github.mateuszuran.ptdlitemono.dto.FuelRequest;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FuelMapper {
    private final ModelMapperConfig mapper;

    public Fuel mapToFuelRequest(FuelRequest fuelRequest) {
        return mapper.modelMapper().map(fuelRequest, Fuel.class);
    }
}
