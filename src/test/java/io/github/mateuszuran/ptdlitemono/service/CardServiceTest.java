package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.CardRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.*;
import io.github.mateuszuran.ptdlitemono.exception.CardEmptyException;
import io.github.mateuszuran.ptdlitemono.exception.CardExistsException;
import io.github.mateuszuran.ptdlitemono.exception.CardNotFoundException;
import io.github.mateuszuran.ptdlitemono.helpers.PTDModelHelpers;
import io.github.mateuszuran.ptdlitemono.mapper.CardMapper;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import io.github.mateuszuran.ptdlitemono.service.async.CardStatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@Slf4j
@ExtendWith(MockitoExtension.class)
class CardServiceTest {

    private CardService service;
    @Mock
    private CardRepository repository;
    @Mock
    private CardMapper mapper;
    @Mock
    private FuelMapper fuelMapper;
    @Mock
    private TripMapper tripMapper;
    @Mock
    private CardStatisticsService statisticsService;

    private PTDModelHelpers helpers;

    @BeforeEach
    void setUp() {
        service = new CardService(repository, mapper, fuelMapper, tripMapper, statisticsService);
        helpers = new PTDModelHelpers();
    }

    @Test
    void givenCardId_whenFindById_thenReturnObject() {
        //given
        Card card = Card.builder().number("ABC").build();
        when(repository.findById(anyLong())).thenReturn(Optional.of(card));
        //when
        var result = service.checkIfCardExists(anyLong());
        //then
        assertThat(result).isEqualTo(card);
    }

    @Test
    void givenCardId_whenFindById_thenThrowException() {
        //given + when
        when(repository.findById(anyLong())).thenReturn(Optional.empty());
        //then
        assertThatThrownBy(() -> service.checkIfCardExists(anyLong()))
                .isInstanceOf(CardNotFoundException.class)
                .hasMessageContaining("Card not found");
    }

    @Test
    void givenCardObject_whenSave_thenDoNothing() {
        //given
        CardRequest request = CardRequest.builder().number("1234567890").username("john_doe").build();
        when(repository.existsByNumberIgnoreCaseAndUsername(anyString(), anyString()))
                .thenReturn(false);
        when(repository.save(any(Card.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        //when
        service.saveNewCard(request);

        //then
        verify(repository, times(1)).existsByNumberIgnoreCaseAndUsername("1234567890", "john_doe");
        verify(repository, times(1)).save(any(Card.class));
    }

    @Test
    void givenCardObject_ifExists_thenThrowException() {
        //given
        CardRequest request = CardRequest.builder().number("1234567890").username("john_doe").build();
        when(repository.existsByNumberIgnoreCaseAndUsername(anyString(), anyString()))
                .thenReturn(true);
        //then
        assertThatThrownBy(() -> service.saveNewCard(request))
                .isInstanceOf(CardExistsException.class)
                .hasMessageContaining("Card with number: " + request.getNumber() + " already exists.");
    }

    @Test
    void givenCardObject_whenNumberEmpty_thenThrowException() {
        //given
        CardRequest request = CardRequest.builder().number("").username("john_doe").build();
        //then
        assertThatThrownBy(() -> service.saveNewCard(request))
                .isInstanceOf(CardEmptyException.class)
                .hasMessageContaining("Card is empty.");
    }

    @Test
    void givenCardNumberAndId_whenUpdate_thenReturnUpdatedNumber() {
        //given
        Long cardId = 1L;
        String newNumber = "9876543210";
        Card cardToBeEdited = Card.builder().number("1234567890").username("john_doe").build();
        Card editedCard = Card.builder().number("9876543210").username("john_doe").build();

        when(repository.findById(cardId)).thenReturn(Optional.of(cardToBeEdited));
        when(repository.save(cardToBeEdited)).thenReturn(editedCard);
        when(mapper.mapToCardResponseWithFormattedCreationTime(editedCard))
                .thenReturn(CardResponse.builder().number(editedCard.getNumber()).creationTime("2023-06-15 12:00 PM").build());

        //when
        CardResponse editedCardResponse = service.editCardNumber(cardId, newNumber);

        //then
        assertEquals(newNumber, editedCardResponse.getNumber());
        assertEquals("2023-06-15 12:00 PM", editedCardResponse.getCreationTime());
        verify(repository, times(1)).save(cardToBeEdited);
        verify(mapper, times(1)).mapToCardResponseWithFormattedCreationTime(editedCard);
    }

    @Test
    void givenUsername_whenGetLastThreeCards_thenReturnDescList() {
        //given
        String username = "admin";
        var descCardModelList = helpers.createCardsModelSorted();
        var descCardResponseList = helpers.createCardResponseSortedDesc();
        when(repository.findLastThreeEntitiesByUsernameAndOrderByCreationTime(username)).thenReturn(descCardModelList);

        when(mapper.mapToCardResponseWithFormattedCreationTime(descCardModelList.get(0))).thenReturn(descCardResponseList.get(0));
        when(mapper.mapToCardResponseWithFormattedCreationTime(descCardModelList.get(1))).thenReturn(descCardResponseList.get(1));
        when(mapper.mapToCardResponseWithFormattedCreationTime(descCardModelList.get(2))).thenReturn(descCardResponseList.get(2));
        when(mapper.mapToCardResponseWithFormattedCreationTime(descCardModelList.get(3))).thenReturn(descCardResponseList.get(3));
        //when
        var result = service.getLastThreeCardsSortedDescByTime(username);
        //then
        assertEquals(descCardResponseList, result);
    }

    @Test
    void givenCardId_whenGetAllData_thenReturnReadyObject() {
        //given
        Long cardId = 123L;
        var readyCardModel = helpers.cardModelForPdf();
        var readyCardDtoResponseModel = helpers.cardDtoResponseForPdf();

        when(repository.findById(cardId)).thenReturn(Optional.of(readyCardModel));

        when(tripMapper.mapToTripResponse(readyCardModel.getTrips().get(0))).thenReturn(readyCardDtoResponseModel.getTrips().get(0));
        when(tripMapper.mapToTripResponse(readyCardModel.getTrips().get(1))).thenReturn(readyCardDtoResponseModel.getTrips().get(1));
        when(tripMapper.mapToTripResponse(readyCardModel.getTrips().get(2))).thenReturn(readyCardDtoResponseModel.getTrips().get(2));

        when(fuelMapper.mapToFuelResponse(readyCardModel.getFuels().get(0))).thenReturn(readyCardDtoResponseModel.getFuels().get(0));
        when(fuelMapper.mapToFuelResponse(readyCardModel.getFuels().get(1))).thenReturn(readyCardDtoResponseModel.getFuels().get(1));
        when(fuelMapper.mapToFuelResponse(readyCardModel.getFuels().get(2))).thenReturn(readyCardDtoResponseModel.getFuels().get(2));
        when(fuelMapper.mapToFuelResponse(readyCardModel.getFuels().get(3))).thenReturn(readyCardDtoResponseModel.getFuels().get(3));

        when(fuelMapper.mapToAdBlueResponse(readyCardModel.getAdBlue().get(0))).thenReturn(readyCardDtoResponseModel.getBlue().get(0));
        when(fuelMapper.mapToAdBlueResponse(readyCardModel.getAdBlue().get(1))).thenReturn(readyCardDtoResponseModel.getBlue().get(1));
        //when
        var result = service.getAllCardDataForPdf(cardId);
        //then
        assertEquals(readyCardDtoResponseModel, result);
    }

    @Test
    void givenCardId_whenExists_delete() {
        //given
        Card card = Card.builder().id(anyLong()).number("ABC").build();
        when(repository.findById(card.getId())).thenReturn(Optional.of(card));
        //when
        service.deleteCard(card.getId());
        //then
        verify(repository, times(1)).deleteById(card.getId());
    }

    @Test
    void givenCardId_whenOptionalEmpty_thenThrowException() {
        //given + when
        when(repository.findById(anyLong())).thenReturn(Optional.empty());
        //then
        assertThatThrownBy(() -> service.deleteCard(anyLong()))
                .isInstanceOf(CardNotFoundException.class)
                .hasMessageContaining("Card not found");
    }

    @Test
    void givenCardId_whenStreamCard_thenReturnFuelsAndTrips() {
        //given
        Trip trip1 = Trip.builder().counterStart(111).counterEnd(222).build();
        Trip trip2 = Trip.builder().counterStart(333).counterEnd(444).build();
        Trip trip3 = Trip.builder().counterStart(555).counterEnd(666).build();
        Fuel fuel1 = Fuel.builder().refuelingAmount(300).vehicleCounter(100).build();
        Fuel fuel2 = Fuel.builder().refuelingAmount(230).vehicleCounter(500).build();
        Fuel fuel3 = Fuel.builder().refuelingAmount(600).vehicleCounter(200).build();
        AdBlue blue = AdBlue.builder().adBlueDate("1-02-2023").adBlueLocalization("Warsaw").adBlueAmount(300).build();
        Card card = Card.builder().number("XYZ")
                .trips(List.of(trip1, trip2, trip3))
                .fuels(List.of(fuel1, fuel2, fuel3))
                .adBlue(List.of(blue))
                .build();
        when(repository.findById(anyLong())).thenReturn(Optional.of(card));

        TripResponse response1 = TripResponse.builder().counterStart(111).counterEnd(222).build();
        TripResponse response2 = TripResponse.builder().counterStart(333).counterEnd(444).build();
        TripResponse response3 = TripResponse.builder().counterStart(555).counterEnd(666).build();
        when(tripMapper.mapToTripResponse(trip1)).thenReturn(response1);
        when(tripMapper.mapToTripResponse(trip2)).thenReturn(response2);
        when(tripMapper.mapToTripResponse(trip3)).thenReturn(response3);
        FuelResponse response4 = FuelResponse.builder().refuelingAmount(300).vehicleCounter(100).build();
        FuelResponse response5 = FuelResponse.builder().refuelingAmount(230).vehicleCounter(500).build();
        FuelResponse response6 = FuelResponse.builder().refuelingAmount(600).vehicleCounter(200).build();
        when(fuelMapper.mapToFuelResponse(fuel1)).thenReturn(response4);
        when(fuelMapper.mapToFuelResponse(fuel2)).thenReturn(response5);
        when(fuelMapper.mapToFuelResponse(fuel3)).thenReturn(response6);
        AdBlueResponse response7 = AdBlueResponse.builder().adBlueDate("1-02-2023").adBlueLocalization("Warsaw").adBlueAmount(300).build();
        when(fuelMapper.mapToAdBlueResponse(blue)).thenReturn(response7);

        CardDetailsResponse response = CardDetailsResponse.builder()
                .trips(List.of(response1, response2, response3))
                .fuels(List.of(response4, response6, response5))
                .blue(List.of(response7))
                .build();

        //when
        var result = service.getAllCardsAssociatedInformation(anyLong());
        //then
        assertThat(result).isEqualTo(response);

    }

    @Test
    void givenDateString_whenPassString_thenReturnLocaleDateTime() {
        //given
        String dateString = "2023-06-30 15:30:00";
        LocalDateTime expectedDateTime = LocalDateTime.of(2023, 6, 30, 15, 30, 0);
        //when
        var result = service.parseDate(dateString);
        //then
        assertEquals(expectedDateTime, result);
    }

    @Test
    void givenUsernameAndDate_whenRetrieve_thenReturnListOfCards() {
        //given
        String username = "admin";
        LocalDateTime firstDate = LocalDateTime.of(2023, 5, 1, 12, 0, 0);
        LocalDateTime secondDate = LocalDateTime.of(2023, 5, 5, 15, 30, 0);
        var expectedCards = helpers.createCardsModelSorted();
        when(repository.findAllByUsernameAndCreationTimeBetweenAndOrderByCreationTimeDesc(username, firstDate, secondDate)).thenReturn(expectedCards);
        //when
        var result = service.retrieveCardsDateBetween(username, firstDate, secondDate);
        //then
        assertEquals(expectedCards, result);
        assertEquals(expectedCards.get(0), result.get(0));
    }

    @Test
    void givenUsernameAndDates_whenRetrieve_thenReturnMappedCards() {
        String username = "admin";
        String firstDatePlainString = "2023-05-01 12:00:00";
        String secondDatePlainString = "2023-05-05 15:30:00";
        LocalDateTime firstDate = LocalDateTime.of(2023, 5, 1, 12, 0, 0);
        LocalDateTime secondDate = LocalDateTime.of(2023, 5, 5, 15, 30, 0);
        var repoResult = helpers.createCardsModel();
        var expectedResponse = helpers.createCardResponse();
        when(repository.findAllByUsernameAndCreationTimeBetweenAndOrderByCreationTimeDesc(username, firstDate, secondDate)).thenReturn(repoResult);
        when(mapper.mapCardToCardResponse(repoResult.get(0))).thenReturn(expectedResponse.get(0));
        when(mapper.mapCardToCardResponse(repoResult.get(1))).thenReturn(expectedResponse.get(1));
        when(mapper.mapCardToCardResponse(repoResult.get(2))).thenReturn(expectedResponse.get(2));
        when(mapper.mapCardToCardResponse(repoResult.get(3))).thenReturn(expectedResponse.get(3));
        //when
        var result = service.retrieveCardsForArchive(username, firstDatePlainString, secondDatePlainString);
        assertEquals(expectedResponse, result);
    }
}