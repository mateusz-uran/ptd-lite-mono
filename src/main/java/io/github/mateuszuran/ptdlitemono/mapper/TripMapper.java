package io.github.mateuszuran.ptdlitemono.mapper;

import io.github.mateuszuran.ptdlitemono.config.ModelMapperConfig;
import io.github.mateuszuran.ptdlitemono.dto.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripGroupResponse;
import io.github.mateuszuran.ptdlitemono.dto.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripResponse;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TripMapper {
    private final ModelMapperConfig mapper;

    public TripResponse mapToTripResponseWithModelMapper(Trip trip) {
        TripResponse tripResponse = mapper.modelMapper().map(trip, TripResponse.class);
        if (trip.getTripGroup() != null) {
            List<Long> tripIds = trip.getTripGroup().getTrips().stream()
                    .map(Trip::getId)
                    .collect(Collectors.toList());
            tripResponse.getGroup().setTripIds(tripIds);
        }
        return tripResponse;
    }

    public Trip mapToTripValuesWithModelMapper(TripRequest tripValues) {
        return mapper.modelMapper().map(tripValues, Trip.class);
    }

    public <T, V> void mapToUpdate(T source, V target) {
        mapper.modelMapper().map(source, target);
    }

    public TripGroup mapToTripGroup(TripGroupRequest request) {
        return mapper.modelMapper().map(request, TripGroup.class);
    }

    public TripGroupResponse mapToTripGroupResponse(TripGroup group) {
        return mapper.modelMapper().map(group, TripGroupResponse.class);
    }
}
