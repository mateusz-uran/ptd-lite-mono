package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.exception.CardNotFoundException;
import io.github.mateuszuran.ptdlitemono.exception.TripGroupNotFoundException;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import io.github.mateuszuran.ptdlitemono.repository.TripGroupRepository;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TripGroupServiceTest {
    private TripGroupService service;
    @Mock
    private TripGroupRepository repository;
    @Mock
    private TripRepository tripRepository;

    @BeforeEach
    void setUp() {
        service = new TripGroupService(repository, tripRepository);
    }

    @Test
    void givenTripGroupRequest_whenAdd_thenVerify() {
        //given
        Long tripId1 = 1L;
        Long tripId2 = 2L;
        Long tripId3 = 3L;
        String cargoName = "food";
        var trips = tripList();
        TripGroupRequest request = TripGroupRequest.builder()
                .tripIds(List.of(tripId1, tripId2, tripId3))
                .cargoName(cargoName)
                .build();
        when(tripRepository.findAllById(List.of(tripId1, tripId2, tripId3))).thenReturn(trips);
        //when
        service.createGroup(request);
        //then
        verify(tripRepository, times(1)).findAllById(List.of(tripId1, tripId2, tripId3));
        verify(repository, times(1)).save(any(TripGroup.class));

        ArgumentCaptor<TripGroup> groupCaptor = ArgumentCaptor.forClass(TripGroup.class);
        verify(repository).save(groupCaptor.capture());

        TripGroup savedGroup = groupCaptor.getValue();
        assertEquals(cargoName, savedGroup.getCargoName());
        List<Trip> savedTrips = savedGroup.getTrips();
        assertEquals(3, savedTrips.size());
        assertEquals(trips.get(0), savedTrips.get(0));
        assertEquals(trips.get(1), savedTrips.get(1));
        assertEquals(trips.get(2), savedTrips.get(2));
    }

    @Test
    void givenTripIds_whenUpdateGroup_thenVerify() {
        //given
        Long tripId1 = 1L;
        Long tripId2 = 2L;
        Long groupId = 3L;
        Trip trip1 = Trip.builder().id(tripId1).build();
        Trip trip2 = Trip.builder().id(tripId2).build();
        when(tripRepository.findAllById(Arrays.asList(tripId1, tripId2)))
                .thenReturn(Arrays.asList(trip1, trip2));
        TripGroup existingGroup = TripGroup.builder().id(groupId).trips(new ArrayList<>()).build();
        when(repository.findById(groupId))
                .thenReturn(Optional.of(existingGroup));
        //when
        TripGroupRequest request = TripGroupRequest.builder().tripIds(Arrays.asList(tripId1, tripId2)).build();
        service.addTripToGroup(request, groupId);
        //then
        verify(tripRepository, times(1)).findAllById(Arrays.asList(tripId1, tripId2));
        verify(repository, times(1)).findById(groupId);
        verify(repository, times(1)).save(existingGroup);
    }

    @Test
    void givenTripIds_whenGroupNotFoundWhenAddTrips_thenThrowException() {
        //given
        Long tripId1 = 1L;
        Long tripId2 = 2L;
        Trip trip1 = Trip.builder().id(tripId1).build();
        Trip trip2 = Trip.builder().id(tripId2).build();
        when(tripRepository.findAllById(Arrays.asList(tripId1, tripId2)))
                .thenReturn(Arrays.asList(trip1, trip2));
        when(repository.findById(anyLong())).thenReturn(Optional.empty());
        //when + then
        TripGroupRequest request = TripGroupRequest.builder().tripIds(Arrays.asList(tripId1, tripId2)).build();
        assertThatThrownBy(() -> service.addTripToGroup(request, anyLong()))
                .isInstanceOf(TripGroupNotFoundException.class)
                .hasMessageContaining("Group not found");
    }

    @Test
    void givenTripIds_whenRemoveFromGroup_thenVerify() {
        // Given
        Long tripId1 = 1L;
        Long tripId2 = 2L;
        Long groupId = 3L;

        Trip trip1 = Trip.builder().id(tripId1).build();
        Trip trip2 = Trip.builder().id(tripId2).build();

        when(tripRepository.findAllById(new ArrayList<>(Arrays.asList(tripId1, tripId2))))
                .thenReturn(Arrays.asList(trip1, trip2));

        // Create a complete instance of TripGroup with the necessary properties
        TripGroup existingGroup = TripGroup.builder()
                .id(groupId)
                .trips(new ArrayList<>(Arrays.asList(trip1, trip2)))
                .build();

        when(repository.findById(groupId))
                .thenReturn(Optional.of(existingGroup));

        // When
        TripGroupRequest request = TripGroupRequest.builder().tripIds(new ArrayList<>(Arrays.asList(tripId1, tripId2))).build();
        service.removeTripFromGroup(request, groupId);

        // Then
        verify(tripRepository, times(1)).findAllById(Arrays.asList(tripId1, tripId2));
        verify(repository, times(1)).findById(groupId);
        verify(repository, times(1)).save(existingGroup);
    }

    @Test
    void givenTripIds_whenGroupNotFoundWhenRemove_thenThrowException() {
        //when
        Long tripId1 = 1L;
        Long tripId2 = 2L;
        Trip trip1 = Trip.builder().id(tripId1).build();
        Trip trip2 = Trip.builder().id(tripId2).build();
        when(tripRepository.findAllById(Arrays.asList(tripId1, tripId2)))
                .thenReturn(Arrays.asList(trip1, trip2));
        when(repository.findById(anyLong())).thenReturn(Optional.empty());
        //when + then
        TripGroupRequest request = TripGroupRequest.builder().tripIds(Arrays.asList(tripId1, tripId2)).build();
        assertThatThrownBy(() -> service.removeTripFromGroup(request, anyLong()))
                .isInstanceOf(TripGroupNotFoundException.class)
                .hasMessageContaining("Group not found");
    }

    private List<Trip> tripList() {
        Trip trip1 = Trip.builder().id(1L).counterStart(111).counterEnd(222).tripGroup(null).build();
        Trip trip2 = Trip.builder().id(2L).counterStart(333).counterEnd(444).tripGroup(null).build();
        Trip trip3 = Trip.builder().id(3L).counterStart(555).counterEnd(666).tripGroup(null).build();
        return List.of(trip1, trip2, trip3);
    }
}