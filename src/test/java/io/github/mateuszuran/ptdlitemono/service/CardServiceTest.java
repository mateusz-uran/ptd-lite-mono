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

import java.time.LocalDateTime;
import java.util.Optional;

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
}