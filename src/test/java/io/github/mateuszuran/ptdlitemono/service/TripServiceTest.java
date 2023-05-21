package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.TripRequest;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
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
        List<Trip> trips = List.of(trip1, trip2, trip3);
        when(mapper.mapToTripValuesWithModelMapper(request1)).thenReturn(trip1);
        when(mapper.mapToTripValuesWithModelMapper(request2)).thenReturn(trip2);
        when(mapper.mapToTripValuesWithModelMapper(request3)).thenReturn(trip3);

        //when
        service.addManyTips(tripRequests, anyLong());
        //then
        verify(repository, times(1)).saveAll(trips);
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
}