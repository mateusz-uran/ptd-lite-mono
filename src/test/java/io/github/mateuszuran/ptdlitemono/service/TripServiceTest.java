package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripResponse;
import io.github.mateuszuran.ptdlitemono.exception.TripsEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
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

    @BeforeEach
    void setUp() {
        service = new TripService(repository, cardService, mapper);
    }

    @Test
    void givenCardIdAndTripList_whenSave_thenDoNothing() {
        //given
        List<Trip> emptyTripList = new ArrayList<>();
        Card card = Card.builder().id(anyLong()).number("XYZ").trips(emptyTripList).build();
        when(cardService.checkIfCardExists(card.getId())).thenReturn(card);

        TripRequest request1 = TripRequest.builder().counterStart(111).counterEnd(222).build();
        TripRequest request2 = TripRequest.builder().counterStart(333).counterEnd(444).build();
        TripRequest request3 = TripRequest.builder().counterStart(555).counterEnd(666).build();
        List<TripRequest> tripRequests = List.of(request1, request2, request3);

        Trip trip1 = Trip.builder().counterStart(111).counterEnd(222).build();
        Trip trip2 = Trip.builder().counterStart(333).counterEnd(444).build();
        Trip trip3 = Trip.builder().counterStart(555).counterEnd(666).build();
        when(mapper.mapToTripValuesWithModelMapper(request1)).thenReturn(trip1);
        when(mapper.mapToTripValuesWithModelMapper(request2)).thenReturn(trip2);
        when(mapper.mapToTripValuesWithModelMapper(request3)).thenReturn(trip3);

        //when
        service.addManyTips(tripRequests, card.getId());
        //then
        var updatedCard = cardService.checkIfCardExists(card.getId());
        assertThat(updatedCard.getTrips()).isEqualTo(List.of(trip1, trip2, trip3));
    }

    @Test
    void givenIdList_whenFindAll_thenDelete() {
        //given
        Trip trip1 = Trip.builder().counterStart(111).counterEnd(222).build();
        Trip trip2 = Trip.builder().counterStart(333).counterEnd(444).build();
        Trip trip3 = Trip.builder().counterStart(555).counterEnd(666).build();
        List<Trip> trips = List.of(trip1, trip2, trip3);
        List<Long> selectedTrips = List.of(1L, 2L, 3L);
        when(repository.findAllByIdIn(selectedTrips)).thenReturn(Optional.of(trips));
        //when
        service.deleteSelected(List.of(1L, 2L, 3L));
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
        when(mapper.mapToTripResponseWithModelMapper(trips.get(0))).thenReturn(response.get(0));
        when(mapper.mapToTripResponseWithModelMapper(trips.get(1))).thenReturn(response.get(1));
        when(mapper.mapToTripResponseWithModelMapper(trips.get(2))).thenReturn(response.get(2));

        //when
        List<TripResponse> result = service.retrieveTripsFromCard(cardId);

        //then
        assertEquals(response, result);
    }

    @Test
    void givenTripAndId_whenUpdate_thenReturnUpdatedObject() {
        //given
        Long tripId = 1L;
        Trip tripToUpdate = Trip.builder().counterStart(200).counterEnd(500).carMileage(300).build();
        TripRequest request = TripRequest.builder().counterStart(150).build();
        Trip updatedTrip = Trip.builder().counterStart(150).counterEnd(500).carMileage(350).build();
        TripResponse expectedResponse = TripResponse.builder().counterStart(150).counterEnd(500).carMileage(350).build();

        when(repository.findById(tripId)).thenReturn(Optional.of(tripToUpdate));
        when(repository.save(any(Trip.class))).thenReturn(updatedTrip);

        doNothing().when(mapper).mapToUpdate(request, tripToUpdate);
        when(mapper.mapToTripResponseWithModelMapper(updatedTrip)).thenReturn(expectedResponse);

        //when
        TripResponse actualResponse = service.editTrip(tripId, request);

        //then
        assertEquals(expectedResponse, actualResponse);
        verify(repository).findById(tripId);
        verify(repository).save(tripToUpdate);
        verify(mapper).mapToUpdate(request, tripToUpdate);
        verify(mapper).mapToTripResponseWithModelMapper(updatedTrip);
    }

    @Test
    void givenTripId_whenUpdate_thenThrowException() {
        //given
        TripRequest request = TripRequest.builder().counterStart(150).build();
        when(repository.findById(anyLong())).thenReturn(Optional.empty());
        //when + then
        assertThatThrownBy(() -> service.editTrip(anyLong(), request))
                .isInstanceOf(TripsEmptyException.class)
                .hasMessageContaining("Trips data is empty");

    }
}