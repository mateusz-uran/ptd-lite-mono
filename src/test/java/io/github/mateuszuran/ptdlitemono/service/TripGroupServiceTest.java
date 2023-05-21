package io.github.mateuszuran.ptdlitemono.service;

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
    private CardService cardService;

    @BeforeEach
    void setUp() {
        service = new TripGroupService(repository, mapper, cardService);
    }

    @Test
    void givenTripGroupDto_whenSave_thenReturnCreatedGroup() {
        //given

        TripGroupResponse request = createGroupDto();
        TripGroup group = TripGroup.builder()
                .cargoName(request.getCargoName())
                .weight(request.getWeight())
                .temperature(request.getTemperature())
                .tripsIds(List.of(1L, 2L, 3L))
                .build();

        when(repository.save(group)).thenReturn(group);
        //when
        var result = service.createGroupTrips(request, anyLong());
        //then
        verify(repository, times(1)).save(group);
        assertThat(result.getCargoName()).isEqualTo(group.getCargoName());
    }

    private static List<Trip> createListOfTrips() {
        List<Trip> trips = new ArrayList<>();
        Trip trip1 = Trip.builder().id(1L).counterStart(111).counterEnd(222).build();
        Trip trip2 = Trip.builder().id(2L).counterStart(333).counterEnd(444).build();
        Trip trip3 = Trip.builder().id(3L).counterStart(555).counterEnd(666).build();
        trips.add(trip1);
        trips.add(trip2);
        trips.add(trip3);
        return trips;
    }

    private static TripGroup createGroup() {
        return TripGroup.builder()
                .id(1L)
                .cargoName("medicine")
                .temperature(15)
                .weight(20)
                .tripsIds(List.of(1L, 2L, 3L))
                .build();
    }

    private static TripGroupResponse createGroupDto() {
        return TripGroupResponse.builder()
                .cargoName("medicine")
                .temperature(15)
                .weight(20)
                .tripsIds(List.of(1L, 2L, 3L))
                .build();
    }
}