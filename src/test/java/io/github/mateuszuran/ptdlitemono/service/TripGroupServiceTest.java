package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.TripGroupResponse;
import io.github.mateuszuran.ptdlitemono.exception.TripGroupException;
import io.github.mateuszuran.ptdlitemono.exception.TripGroupNotFoundException;
import io.github.mateuszuran.ptdlitemono.helpers.PTDModelHelpers;
import io.github.mateuszuran.ptdlitemono.mapper.GenericMapper;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
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
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TripGroupServiceTest {
    private TripGroupService service;
    @Mock
    private TripGroupRepository repository;
    @Mock
    private TripRepository tripRepository;
    @Mock
    private TripMapper mapper;
    @Mock
    private GenericMapper genericMapper;
    private PTDModelHelpers helpers;

    @BeforeEach
    void setUp() {
        service = new TripGroupService(repository, tripRepository, mapper, genericMapper);
        helpers = new PTDModelHelpers();
    }

    @Test
    void givenTripGroupRequest_whenAdd_thenVerify() {
        //given
        Long tripId1 = 1L;
        Long tripId2 = 2L;
        Long tripId3 = 3L;
        String cargoName = "food";
        Integer cargoWeight = 50;
        Integer cargoTemperature = 123;
        var trips = helpers.createTripsModel();
        TripGroupRequest request = TripGroupRequest.builder()
                .tripIds(List.of(tripId1, tripId2, tripId3))
                .temperature(123)
                .weight(50)
                .cargoName(cargoName)
                .build();
        when(tripRepository.findAllById(List.of(tripId1, tripId2, tripId3))).thenReturn(trips);

        TripGroup group = TripGroup.builder().cargoName(cargoName).temperature(123).weight(50).trips(new ArrayList<>()).build();
        when(mapper.mapToTripGroup(request)).thenReturn(group);
        //when
        service.createGroup(request);
        //then
        verify(tripRepository, times(1)).findAllById(List.of(tripId1, tripId2, tripId3));
        verify(repository, times(1)).save(any(TripGroup.class));

        ArgumentCaptor<TripGroup> groupCaptor = ArgumentCaptor.forClass(TripGroup.class);
        verify(repository).save(groupCaptor.capture());

        TripGroup savedGroup = groupCaptor.getValue();
        assertEquals(cargoName, savedGroup.getCargoName());
        assertEquals(cargoWeight, savedGroup.getWeight());
        assertEquals(cargoTemperature, savedGroup.getTemperature());
        List<Trip> savedTrips = savedGroup.getTrips();
        assertEquals(3, savedTrips.size());
        assertEquals(trips.get(0), savedTrips.get(0));
        assertEquals(trips.get(1), savedTrips.get(1));
        assertEquals(trips.get(2), savedTrips.get(2));
    }

    @Test
    void givenTripsWithExistingGroup_whenAdd_thenThrowException() {
        Long tripId1 = 1L;
        Long tripId2 = 2L;
        String cargoName = "food";
        TripGroup existingGroup = TripGroup.builder().cargoName(cargoName).build();
        Trip trip1 = Trip.builder().id(1L).counterStart(111).counterEnd(222).tripGroup(existingGroup).build();
        Trip trip2 = Trip.builder().id(2L).counterStart(333).counterEnd(444).tripGroup(existingGroup).build();
        TripGroupRequest request = TripGroupRequest.builder()
                .tripIds(List.of(tripId1, tripId2))
                .temperature(123)
                .weight(50)
                .cargoName(cargoName)
                .build();
        when(tripRepository.findAllById(List.of(tripId1, tripId2))).thenReturn(List.of(trip1, trip2));
        //when + then
        assertThatThrownBy(() -> service.createGroup(request))
                .isInstanceOf(TripGroupException.class)
                .hasMessageContaining("Trip cannot have group.");
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
        service.addTripToGroup(Arrays.asList(tripId1, tripId2), groupId);
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
        assertThatThrownBy(() -> service.addTripToGroup(Arrays.asList(tripId1, tripId2), anyLong()))
                .isInstanceOf(TripGroupNotFoundException.class)
                .hasMessageContaining("Group not found");
    }

    @Test
    void givenTripIds_whenTripHasGroup_thenThrowException() {
        //given
        Long tripId1 = 1L;
        Long tripId2 = 2L;
        TripGroup existingGroup = TripGroup.builder().trips(new ArrayList<>()).build();
        Trip trip1 = Trip.builder().id(tripId1).tripGroup(existingGroup).build();
        Trip trip2 = Trip.builder().id(tripId2).tripGroup(existingGroup).build();
        when(tripRepository.findAllById(Arrays.asList(tripId1, tripId2)))
                .thenReturn(Arrays.asList(trip1, trip2));
        //when + then
        assertThatThrownBy(() -> service.addTripToGroup(Arrays.asList(tripId1, tripId2), anyLong()))
                .isInstanceOf(TripGroupException.class)
                .hasMessageContaining("Trip cannot have group.");
    }

    @Test
    void givenTripIds_whenRemoveFromGroup_thenVerify() {
        //given
        List<Long> tripIds = Arrays.asList(1L, 2L, 3L);
        Long groupId = 100L;

        TripGroup existingGroup = new TripGroup();
        existingGroup.setId(groupId);

        Trip trip1 = new Trip();
        Trip trip2 = new Trip();
        Trip trip3 = new Trip();

        trip1.setTripGroup(existingGroup);
        trip2.setTripGroup(existingGroup);
        trip3.setTripGroup(existingGroup);

        List<Trip> tripsToUpdate = Arrays.asList(trip1, trip2, trip3);

        when(tripRepository.findAllById(tripIds)).thenReturn(tripsToUpdate);
        when(repository.findById(groupId)).thenReturn(Optional.of(existingGroup));

        //when
        service.removeTripFromGroup(tripIds, groupId);

        //then
        verify(repository, times(1)).findById(groupId);
        verify(tripRepository, times(1)).findAllById(tripIds);
        verify(repository, times(1)).save(existingGroup);

        assertTrue(tripsToUpdate.stream().allMatch(trip -> trip.getTripGroup() == null));
    }

    @Test
    void givenTripIds_whenGroupNotFoundWhenRemove_thenThrowException() {
        //when
        Long tripId1 = 1L;
        Long tripId2 = 2L;
        Long groupId = 123L;
        TripGroup group = TripGroup.builder().id(groupId).build();
        Trip trip1 = Trip.builder().id(tripId1).build();
        trip1.setTripGroup(group);
        Trip trip2 = Trip.builder().id(tripId2).build();
        trip2.setTripGroup(group);
        when(tripRepository.findAllById(Arrays.asList(tripId1, tripId2)))
                .thenReturn(Arrays.asList(trip1, trip2));
        when(repository.findById(anyLong())).thenReturn(Optional.empty());
        //when + then
        assertThatThrownBy(() -> service.removeTripFromGroup(Arrays.asList(tripId1, tripId2), anyLong()))
                .isInstanceOf(TripGroupNotFoundException.class)
                .hasMessageContaining("Group not found");
    }

    @Test
    void givenTripIds_whenTripHasNotGroup_thenThrowException() {
        //given
        Long tripId1 = 1L;
        Long tripId2 = 2L;
        Trip trip1 = Trip.builder().id(tripId1).build();
        Trip trip2 = Trip.builder().id(tripId2).build();
        when(tripRepository.findAllById(Arrays.asList(tripId1, tripId2)))
                .thenReturn(Arrays.asList(trip1, trip2));
        //when + then
        assertThatThrownBy(() -> service.removeTripFromGroup(Arrays.asList(tripId1, tripId2), anyLong()))
                .isInstanceOf(TripGroupException.class)
                .hasMessageContaining("Trip must be in group.");
    }

    @Test
    void givenTripIds_whenTripsHasDifferentGroups_thenThrowException() {
        //given
        Long tripId1 = 1L;
        Long tripId2 = 2L;
        TripGroup group1 = TripGroup.builder().build();
        Trip trip1 = Trip.builder().id(tripId1).tripGroup(group1).build();
        TripGroup group2 = TripGroup.builder().build();
        Trip trip2 = Trip.builder().id(tripId2).tripGroup(group2).build();
        when(tripRepository.findAllById(Arrays.asList(tripId1, tripId2)))
                .thenReturn(Arrays.asList(trip1, trip2));
        when(repository.findById(anyLong())).thenReturn(Optional.of(group1));
        //when + then
        assertThatThrownBy(() -> service.removeTripFromGroup(Arrays.asList(tripId1, tripId2), anyLong()))
                .isInstanceOf(TripGroupException.class)
                .hasMessageContaining("Selected trip has different group.");
    }

    @Test
    void givenGroupId_whenExists_thenDelete() {
        //given
        Long groupId = 123L;
        List<Trip> trips = helpers.createTripsModel();
        TripGroup group = TripGroup.builder().id(groupId).trips(trips).build();
        when(repository.findById(groupId)).thenReturn(Optional.of(group));
        //when
        service.deleteTripGroup(groupId);
        //then
        verify(repository, times(1)).findById(groupId);
        verify(repository, times(1)).delete(group);

        assertEquals(0, group.getTrips().size());

        for (Trip trip : trips) {
            verify(trip).setTripGroup(null);
        }
    }

    @Test
    void givenGroupId_whenNotFound_thenThrowException() {
        //given
        Long groupId = 123L;
        when(repository.findById(groupId)).thenReturn(Optional.empty());
        //when + then
        assertThatThrownBy(() -> service.deleteTripGroup(groupId))
                .isInstanceOf(TripGroupNotFoundException.class)
                .hasMessageContaining("Group not found");
    }

    @Test
    void givenValidGroupIdAndRequest_whenEditTripGroupInformation_thenReturnUpdatedGroup() {
        //given
        Long groupId = 1L;
        Trip trip1 = Trip.builder().counterStart(500).build();
        Trip trip2 = Trip.builder().counterStart(600).build();
        Trip trip3 = Trip.builder().counterStart(830).build();
        TripGroupRequest request = TripGroupRequest.builder().cargoName("food").build();
        TripGroup existingGroup = TripGroup.builder().id(groupId).cargoName("chicken").trips(List.of(trip1, trip2, trip3)).build();

        TripGroup updatedGroup = TripGroup.builder().id(groupId).cargoName("chicken").trips(List.of(trip1, trip2, trip3)).build();

        TripGroupResponse expectedResponse = TripGroupResponse.builder()
                .id(groupId)
                .cargoName("chicken")
                .tripIds(Arrays.asList(trip1.getId(), trip2.getId(), trip3.getId())).build();

        when(repository.findById(groupId)).thenReturn(Optional.of(existingGroup));
        when(repository.save(any(TripGroup.class))).thenReturn(updatedGroup);
        when(mapper.mapToTripGroupResponse(updatedGroup)).thenReturn(expectedResponse);

        //when
        TripGroupResponse response = service.editTripGroupInformation(groupId, request);

        //then
        assertEquals(groupId, response.getId());
        assertEquals("chicken", response.getCargoName());
        assertEquals(trip1.getId(), response.getTripIds().get(0));
    }

    @Test
    void givenInvalidGroupIdAndRequest_whenEditTripGroupInformation_thenThrowException() {
        // given
        Long groupId = 1L;
        TripGroupRequest request = TripGroupRequest.builder().build();
        when(repository.findById(groupId)).thenReturn(Optional.empty());

        // when + then
        assertThatThrownBy(() -> service.editTripGroupInformation(groupId, request))
                .isInstanceOf(TripGroupNotFoundException.class)
                .hasMessageContaining("Group not found");
    }
}