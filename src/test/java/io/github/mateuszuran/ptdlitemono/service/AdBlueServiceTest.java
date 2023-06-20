package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.model.Card;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdBlueServiceTest {
    private AdBlueService service;
    @Mock
    private CardService cardService;

    @BeforeEach
    void setUp() {
        service = new AdBlueService(cardService);
    }

    @Test
    void givenAdBlueAndCardId_whenSave_thenUpdateCardWithAdBlue() {
        //given
        List<AdBlue> emptyList = new ArrayList<>();
        Card card = Card.builder().id(123L).number("ABC").adBlue(emptyList).build();
        AdBlueRequest request = AdBlueRequest.builder()
                .date("1.01")
                .localization("Warsaw")
                .amount(5)
                .build();
        AdBlue blue = AdBlue.builder()
                .adBlueDate("1.01")
                .adBlueLocalization("Warsaw")
                .adBlueAmount(5)
                .build();
        when(cardService.checkIfCardExists(123L)).thenReturn(card);
        //when
        service.addAdBlue(request, card.getId());
        //then
        var updatedCardWithBlue = cardService.checkIfCardExists(card.getId());
        assertThat(updatedCardWithBlue.getAdBlue().contains(blue)).isEqualTo(true);
    }

    @Test
    void givenCardAndBlueId_whenDelete_thenUpdateCard() {
        //given
        AdBlue blue = AdBlue.builder()
                .id(55L)
                .adBlueDate("1.01")
                .adBlueLocalization("Warsaw")
                .adBlueAmount(5)
                .build();
        List<AdBlue> blueList = new ArrayList<>();
        blueList.add(blue);
        Card card = Card.builder().id(123L).number("ABC").adBlue(blueList).build();
        when(cardService.checkIfCardExists(123L)).thenReturn(card);
        //when
        service.deleteAdBlue(card.getId(), 55L);
        //then
        var updatedCard = cardService.checkIfCardExists(card.getId());
        assertThat(updatedCard.getAdBlue()).isEmpty();
    }
}