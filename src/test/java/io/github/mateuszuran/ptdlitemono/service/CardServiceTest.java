package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.CardRequest;
import io.github.mateuszuran.ptdlitemono.dto.CardResponse;
import io.github.mateuszuran.ptdlitemono.exception.CardEmptyException;
import io.github.mateuszuran.ptdlitemono.exception.CardExistsException;
import io.github.mateuszuran.ptdlitemono.exception.CardNotFoundException;
import io.github.mateuszuran.ptdlitemono.mapper.CardMapper;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CardServiceTest {

    private CardService service;
    @Mock
    private CardRepository repository;
    @Mock
    private CardMapper modelMapper;

    @BeforeEach
    void setUp() {
        service = new CardService(repository, modelMapper);
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
    void givenCardObject_whenSave_thenReturnCard() {
        //given
        var now = LocalDateTime.now();
        var date = LocalDateTime.of(2023, 5, 3, now.getHour(), now.getMinute(), now.getSecond());
        Card card = Card.builder().number("ABC").creationTime(date).build();
        CardRequest request = CardRequest.builder().number("ABC").build();
        CardResponse response = CardResponse.builder().number("ABC").build();
        when(modelMapper.mapToCardResponseWithFormattedCreationTime(card)).thenReturn(response);
        //when
        var result = service.saveCard(request, 2023, 5, 3);
        //then
        verify(repository, times(1)).save(card);
        assertThat(result).isEqualTo(response);
    }

    @Test
    void givenCardObject_whenSaveWithExistingNumber_thenThrowException() {
        //given + when
        CardRequest request = CardRequest.builder().number("ABC").username("admin").build();
        when(repository.existsByNumberAndUsername(request.getNumber(), request.getUsername())).thenReturn(true);
        //then
        assertThatThrownBy(() -> service.saveCard(request, 2023, 3, 5))
                .isInstanceOf(CardExistsException.class)
                .hasMessageContaining("Card with number: " + request.getNumber() + " already exists.");
    }

    @Test
    void givenCardObject_whenSaveWithEmptyNumber_thenThrowException() {
        //given + when
        CardRequest request = CardRequest.builder().number("").username("admin").build();
        assertThatThrownBy(() -> service.saveCard(request, 2023, 3, 5))
                .isInstanceOf(CardEmptyException.class)
                .hasMessageContaining("Card is empty.");
    }

    @Test
    void givenUsername_whenGetAllCards_thenReturnCardsFromCurrentMonth() {
        //given
        var actualDate = LocalDate.of(2023, 3, 1);
        LocalDateTime startDate = actualDate.with(firstDayOfMonth()).atStartOfDay();
        LocalDateTime endDate = actualDate.with(lastDayOfMonth()).atStartOfDay();

        when(repository.findAllByUsernameAndCreationTimeBetween("admin", startDate, endDate)).thenReturn(dummyModelData());
        //when
        var result = service.getAllCardsByUserAndDate("admin", 2023, 3);
        //then
        assertThat(result).isEqualTo(dummyModelData());
    }

    @Test
    void givenUsername_whenGetAllCards_thenReturnSortedList() {
        //given
        LocalDateTime startDate = LocalDate.of(2023, 5, 1).with(firstDayOfMonth()).atStartOfDay();
        LocalDateTime endDate = LocalDate.of(2023, 5, 1).with(lastDayOfMonth()).atStartOfDay();

        List<Card> cards = dummyModelData();
        List<CardResponse> expectedResponse = dummyDtoData();

        when(modelMapper.mapToCardResponseWithFormattedCreationTime(cards.get(0))).thenReturn(expectedResponse.get(0));
        when(modelMapper.mapToCardResponseWithFormattedCreationTime(cards.get(1))).thenReturn(expectedResponse.get(1));
        when(modelMapper.mapToCardResponseWithFormattedCreationTime(cards.get(2))).thenReturn(expectedResponse.get(2));
        when(modelMapper.mapToCardResponseWithFormattedCreationTime(cards.get(3))).thenReturn(expectedResponse.get(3));

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