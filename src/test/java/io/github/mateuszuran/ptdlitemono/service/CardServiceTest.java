package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.exception.CardNotFoundException;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CardServiceTest {

    private CardService service;
    @Mock
    private CardRepository repository;

    @BeforeEach
    void setUp() {
        service = new CardService(repository);
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
}