package io.github.mateuszuran.ptdlitemono.mapper;

import io.github.mateuszuran.ptdlitemono.config.ModelMapperConfig;
import io.github.mateuszuran.ptdlitemono.dto.response.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FuelMapper {
    private final ModelMapperConfig mapper;

    public FuelResponse mapToFuelResponse(Fuel fuel) {
        return mapper.modelMapper().map(fuel, FuelResponse.class);
    }

    public Fuel mapToFuelRequest(FuelRequest fuelRequest) {
        return mapper.modelMapper().map(fuelRequest, Fuel.class);
    }


    public AdBlueResponse mapToAdBlueResponse(AdBlue adBlue) {
        return mapper.modelMapper().map(adBlue, AdBlueResponse.class);
    }

    public <T, V> void merge(T source, V target) {
        mapper.modelMapper().map(source, target);
    }

}
