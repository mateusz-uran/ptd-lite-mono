package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripGroupResponse;
import io.github.mateuszuran.ptdlitemono.mapper.TripGroupMapper;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import io.github.mateuszuran.ptdlitemono.repository.TripGroupRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TripGroupServiceTest {
    private TripGroupService service;
    @Mock
    private TripGroupRepository repository;
    @Mock
    private TripGroupMapper mapper;
    @Mock
    private TripService tripService;

    @BeforeEach
    void setUp() {
        service = new TripGroupService(repository, mapper, tripService);
    }

    @Test
    void givenTripGroupDto_whenSave_thenReturnCreatedGroup() {
        //given
        TripGroupRequest request = createGroupDto();
        TripGroup group = TripGroup.builder()
                .cargoName(request.getCargoName())
                .weight(request.getWeight())
                .temperature(request.getTemperature())
                .build();

        when(repository.save(group)).thenReturn(group);
        //when
        var result = service.createGroupTrips(request);
        //then
        verify(repository, times(1)).save(group);
        assertThat(result.getCargoName()).isEqualTo(group.getCargoName());
    }

    private static TripGroupRequest createGroupDto() {
        return TripGroupRequest.builder()
                .cargoName("medicine")
                .temperature(15)
                .weight(20)
                .tripsIds(List.of(1L, 2L, 3L))
                .build();
    }
}