package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.pdf.CardDetailsResponse;
import io.github.mateuszuran.ptdlitemono.dto.request.CardRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.CardResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import io.github.mateuszuran.ptdlitemono.exception.CardEmptyException;
import io.github.mateuszuran.ptdlitemono.exception.CardExistsException;
import io.github.mateuszuran.ptdlitemono.exception.CardNotFoundException;
import io.github.mateuszuran.ptdlitemono.mapper.CardMapper;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;
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

    @BeforeEach
    void setUp() {
        service = new CardService(repository, mapper, fuelMapper, tripMapper);
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
        service.saveCard(request);

        //then
        verify(repository, times(1)).existsByNumberIgnoreCaseAndUsername("1234567890", "john_doe");
        verify(repository, times(1)).save(any(Card.class));
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
        CardResponse editedCardResponse = service.editCard(cardId, newNumber);

        //then
        assertEquals(newNumber, editedCardResponse.getNumber());
        assertEquals("2023-06-15 12:00 PM", editedCardResponse.getCreationTime());
        verify(repository, times(1)).save(cardToBeEdited);
        verify(mapper, times(1)).mapToCardResponseWithFormattedCreationTime(editedCard);
    }

    @Test
    void givenCardObject_whenSaveWithExistingNumber_thenThrowException() {
        //given + when
        CardRequest request = CardRequest.builder().number("ABC").username("admin").build();
        when(repository.existsByNumberIgnoreCaseAndUsername(request.getNumber(), request.getUsername())).thenReturn(true);
        //then
        assertThatThrownBy(() -> service.saveCard(request))
                .isInstanceOf(CardExistsException.class)
                .hasMessageContaining("Card with number: " + request.getNumber() + " already exists.");
    }

    @Test
    void givenCardObject_whenSaveWithEmptyNumber_thenThrowException() {
        //given + when
        CardRequest request = CardRequest.builder().number("").username("admin").build();
        assertThatThrownBy(() -> service.saveCard(request))
                .isInstanceOf(CardEmptyException.class)
                .hasMessageContaining("Card is empty.");
    }

    @Test
    void givenUsername_whenGetAllCards_thenReturnCardsFromCurrentMonth() {
        //given
        String username = "john_doe";
        int year = 2023;
        int month = 6;
        LocalDate actualDate = LocalDate.of(year, month, 1);
        LocalDateTime startDate = actualDate.withDayOfMonth(1).atStartOfDay();
        LocalDateTime endDate = actualDate.withDayOfMonth(actualDate.lengthOfMonth()).atStartOfDay();

        List<Card> expectedCards = new ArrayList<>();
        expectedCards.add(Card.builder().number("1234567890").username(username).creationTime(LocalDateTime.of(2023, 6, 15, 12, 0)).build());
        expectedCards.add(Card.builder().number("0987654321").username(username).creationTime(LocalDateTime.of(2023, 6, 20, 10, 30)).build());

        when(repository.findAllByUsernameAndCreationTimeBetween(username, startDate, endDate))
                .thenReturn(expectedCards);

        // Act
        List<Card> actualCards = service.getAllCardsByUserAndDate(username, year, month);

        // Assert
        assertEquals(expectedCards, actualCards);
        verify(repository, times(1)).findAllByUsernameAndCreationTimeBetween(username, startDate, endDate);
    }

    @Test
    void givenUsername_whenGetAllCards_thenReturnSortedList() {
        //given
        LocalDateTime startDate = LocalDate.of(2023, 5, 1).with(firstDayOfMonth()).atStartOfDay();
        LocalDateTime endDate = LocalDate.of(2023, 5, 1).with(lastDayOfMonth()).atStartOfDay();

        List<Card> cards = dummyModelData();
        List<CardResponse> expectedResponse = dummyDtoData();

        when(mapper.mapToCardResponseWithFormattedCreationTime(cards.get(0))).thenReturn(expectedResponse.get(0));
        when(mapper.mapToCardResponseWithFormattedCreationTime(cards.get(1))).thenReturn(expectedResponse.get(1));
        when(mapper.mapToCardResponseWithFormattedCreationTime(cards.get(2))).thenReturn(expectedResponse.get(2));
        when(mapper.mapToCardResponseWithFormattedCreationTime(cards.get(3))).thenReturn(expectedResponse.get(3));

        when(repository.findAllByUsernameAndCreationTimeBetween("admin", startDate, endDate)).thenReturn(cards);
        //when
        var result = service.getCardsSorted("admin", 2023, 5);
        //then
        assertThat(expectedResponse).isEqualTo(result);
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
        when(tripMapper.mapToTripResponseWithModelMapper(trip1)).thenReturn(response1);
        when(tripMapper.mapToTripResponseWithModelMapper(trip2)).thenReturn(response2);
        when(tripMapper.mapToTripResponseWithModelMapper(trip3)).thenReturn(response3);
        FuelResponse response4 = FuelResponse.builder().refuelingAmount(300).vehicleCounter(100).build();
        FuelResponse response5 = FuelResponse.builder().refuelingAmount(230).vehicleCounter(500).build();
        FuelResponse response6 = FuelResponse.builder().refuelingAmount(600).vehicleCounter(200).build();
        when(fuelMapper.mapToFuelResponseWithModelMapper(fuel1)).thenReturn(response4);
        when(fuelMapper.mapToFuelResponseWithModelMapper(fuel2)).thenReturn(response5);
        when(fuelMapper.mapToFuelResponseWithModelMapper(fuel3)).thenReturn(response6);
        AdBlueResponse response7 = AdBlueResponse.builder().adBlueDate("1-02-2023").adBlueLocalization("Warsaw").adBlueAmount(300).build();
        when(fuelMapper.mapToAdBlueResponse(blue)).thenReturn(response7);

        CardDetailsResponse response = CardDetailsResponse.builder()
                .trips(List.of(response1, response2, response3))
                .fuels(List.of(response4, response6, response5))
                .blue(List.of(response7))
                .build();

        //when
        var result = service.getCardDetails(anyLong());
        //then
        assertThat(result).isEqualTo(response);

    }

    private List<Card> lastThreeCards() {
        var cardOne = Card.builder().username("admin").number("ABC")
                .creationTime(LocalDateTime.of(2023, 3, 1, 12, 0)).build();
        var cardTwo = Card.builder().username("admin").number("ABC")
                .creationTime(LocalDateTime.of(2023, 3, 2, 12, 0)).build();
        var cardThree = Card.builder().username("admin").number("ABC")
                .creationTime(LocalDateTime.of(2023, 3, 3, 12, 0)).build();
        var cardFourth = Card.builder().username("admin").number("ABC")
                .creationTime(LocalDateTime.of(2023, 3, 4, 12, 0)).build();
        var cardFifth = Card.builder().username("admin").number("ABC")
                .creationTime(LocalDateTime.of(2023, 3, 5, 12, 0)).build();
        List<Card> listOfCards = new ArrayList<>();
        listOfCards.add(cardOne);
        listOfCards.add(cardTwo);
        listOfCards.add(cardThree);
        listOfCards.add(cardFourth);
        listOfCards.add(cardFifth);
        return listOfCards.subList(listOfCards.size() - 3, listOfCards.size());
    }

    private List<Card> dummyModelData() {
        var cardOne = Card.builder().username("admin").number("ABC")
                .creationTime(LocalDateTime.of(2023, 5, 1, 12, 0)).build();
        var cardTwo = Card.builder().username("admin").number("DEF")
                .creationTime(LocalDateTime.of(2023, 5, 2, 13, 0)).build();
        var cardThree = Card.builder().username("admin").number("GHI")
                .creationTime(LocalDateTime.of(2023, 5, 3, 14, 0)).build();
        var cardFour = Card.builder().username("admin").number("JKL")
                .creationTime(LocalDateTime.of(2023, 5, 4, 15, 0)).build();
        return List.of(cardOne, cardTwo, cardThree, cardFour);
    }

    private List<CardResponse> dummyDtoData() {
        CardResponse response1 = CardResponse.builder()
                .creationTime("2023-05-1 12:00:00").build();
        CardResponse response2 = CardResponse.builder()
                .creationTime("2023-05-2 13:00:00").build();
        CardResponse response3 = CardResponse.builder()
                .creationTime("2023-05-3 14:00:00").build();
        CardResponse response4 = CardResponse.builder()
                .creationTime("2023-05-4 15:00:00").build();
        return List.of(response4, response3, response2, response1);
    }
}