package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import io.github.mateuszuran.ptdlitemono.exception.TripsEmptyException;
import io.github.mateuszuran.ptdlitemono.helpers.PTDModelHelpers;
import io.github.mateuszuran.ptdlitemono.mapper.GenericMapper;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.CardStatistics;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
import io.github.mateuszuran.ptdlitemono.service.async.CardStatisticsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TripServiceTest {
    private TripService service;
    @Mock
    private TripRepository repository;
    @Mock
    private CardService cardService;
    @Mock
    private TripMapper mapper;
    @Mock
    private GenericMapper genericMapper;
    @Mock
    private CardStatisticsService statisticsService;
    private PTDModelHelpers helpers;

    @BeforeEach
    void setUp() {
        service = new TripService(repository, cardService, mapper, genericMapper, statisticsService);
        helpers = new PTDModelHelpers();
    }

    @Test
    void givenTripRequestListAndCardId_whenSave_thenDoNothing() {
        //given
        List<Trip> emptyTripsList = new ArrayList<>();
        Long cardId = 123L;
        Card existingCard = Card.builder().number("XYZ").trips(emptyTripsList).build();
        when(cardService.checkIfCardExists(cardId)).thenReturn(existingCard);

        var tripRequest = helpers.createTripRequest();
        var tripsModel = helpers.createTripsModel();
        when(genericMapper.mapToEntityModel(tripRequest.get(0), Trip.class)).thenReturn(tripsModel.get(0));
        when(genericMapper.mapToEntityModel(tripRequest.get(1), Trip.class)).thenReturn(tripsModel.get(1));
        when(genericMapper.mapToEntityModel(tripRequest.get(2), Trip.class)).thenReturn(tripsModel.get(2));
        //when
        service.addManyTrips(tripRequest, cardId);
        //then
        verify(cardService).checkIfCardExists(cardId);
        verify(repository).saveAll(anyList());
    }

    @Test
    void givenTripsIdsList_whenFindAll_thenDelete() {
        //given
        String username = "johndoe";
        Trip trip1 = Trip.builder().counterStart(111).counterEnd(222).build();
        Trip trip2 = Trip.builder().counterStart(333).counterEnd(444).build();
        Trip trip3 = Trip.builder().counterStart(555).counterEnd(666).build();
        List<Trip> trips = List.of(trip1, trip2, trip3);
        List<Long> selectedTrips = List.of(1L, 2L, 3L);
        when(repository.findAllByIdIn(selectedTrips)).thenReturn(Optional.of(trips));
        //when
        service.deleteSelectedTrips(List.of(1L, 2L, 3L), username);
        //then
        verify(repository, times(1)).deleteAll(trips);
    }

    @Test
    void givenCardId_whenFindAll_thenReturnMappedList() {
        //given
        Long cardId = 123L;
        Trip trip1 = Trip.builder().counterStart(111).counterEnd(222).build();
        Trip trip2 = Trip.builder().counterStart(333).counterEnd(444).build();
        Trip trip3 = Trip.builder().counterStart(555).counterEnd(666).build();
        List<Trip> trips = List.of(trip1, trip2, trip3);

        TripResponse response1 = TripResponse.builder().counterStart(111).counterEnd(222).build();
        TripResponse response2 = TripResponse.builder().counterStart(333).counterEnd(444).build();
        TripResponse response3 = TripResponse.builder().counterStart(555).counterEnd(666).build();
        List<TripResponse> response = List.of(response1, response2, response3);

        when(repository.findAllTripsByCardId(cardId)).thenReturn(Optional.of(trips));
        when(mapper.mapToTripResponse(trips.get(0))).thenReturn(response.get(0));
        when(mapper.mapToTripResponse(trips.get(1))).thenReturn(response.get(1));
        when(mapper.mapToTripResponse(trips.get(2))).thenReturn(response.get(2));

        //when
        List<TripResponse> result = service.getAllTripsFromCard(cardId);

        //then
        assertEquals(response, result);
    }

    @Test
    void givenCardId_whenTripsAreEmpty_thenThrowException() {
        //given
        Long cardId = 123L;
        List<Trip> emptyList = new ArrayList<>();
        when(repository.findAllTripsByCardId(cardId)).thenReturn(Optional.of(emptyList));
        //when + then
        assertThatThrownBy(() -> service.getAllTripsFromCard(cardId))
                .isInstanceOf(TripsEmptyException.class)
                .hasMessageContaining("Trips data is empty");
    }

    @Test
    void givenTripAndId_whenUpdate_thenReturnUpdatedObject() {
        //given
        String username = "johndoe";
        Long tripId = 1L;
        Trip tripToUpdate = Trip.builder().counterStart(200).counterEnd(500).carMileage(300).build();
        TripRequest request = TripRequest.builder().counterStart(150).build();
        Trip updatedTrip = Trip.builder().counterStart(150).counterEnd(500).carMileage(350).build();
        TripResponse expectedResponse = TripResponse.builder().counterStart(150).counterEnd(500).carMileage(350).build();

        when(repository.findById(tripId)).thenReturn(Optional.of(tripToUpdate));
        when(repository.save(any(Trip.class))).thenReturn(updatedTrip);

        doNothing().when(genericMapper).mergeTwoDifferentObjects(request, tripToUpdate);
        when(mapper.mapToTripResponse(updatedTrip)).thenReturn(expectedResponse);

        //when
        TripResponse actualResponse = service.editSingleTrip(tripId, request, username);

        //then
        assertEquals(expectedResponse, actualResponse);
        verify(repository).findById(tripId);
        verify(repository).save(tripToUpdate);
        verify(genericMapper).mergeTwoDifferentObjects(request, tripToUpdate);
        verify(mapper).mapToTripResponse(updatedTrip);
    }

    @Test
    void givenTripId_whenUpdate_thenThrowException() {
        //given
        String username = "johndoe";
        TripRequest request = TripRequest.builder().counterStart(150).build();
        when(repository.findById(anyLong())).thenReturn(Optional.empty());
        //when + then
        assertThatThrownBy(() -> service.editSingleTrip(anyLong(), request, username))
                .isInstanceOf(TripsEmptyException.class)
                .hasMessageContaining("Trips data is empty");

    }
}