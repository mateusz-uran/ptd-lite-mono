package io.github.mateuszuran.ptdlitemono.mapper;

import io.github.mateuszuran.ptdlitemono.config.ModelMapperConfig;
import io.github.mateuszuran.ptdlitemono.dto.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripResponse;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TripMapper {
    private final ModelMapperConfig mapper;

    public TripResponse mapToTripResponseWithModelMapper(Trip trip) {
        return mapper.modelMapper().map(trip, TripResponse.class);
    }

    public Trip mapToTripValuesWithModelMapper(TripRequest tripValues) {
        return mapper.modelMapper().map(tripValues, Trip.class);
    }
}
