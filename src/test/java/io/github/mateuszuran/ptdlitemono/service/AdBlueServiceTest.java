package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.repository.AdBlueRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@Slf4j
@ExtendWith(MockitoExtension.class)
class AdBlueServiceTest {
    private AdBlueService service;
    @Mock
    private CardService cardService;
    @Mock
    private AdBlueRepository repository;

    @BeforeEach
    void setUp() {
        service = new AdBlueService(cardService, repository);
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
        assertThat(updatedCardWithBlue.getAdBlue())
                .hasSize(1)
                .extracting(AdBlue::getAdBlueLocalization)
                .contains(blue.getAdBlueLocalization());
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
        //when
        service.deleteAdBlue(55L);
        //then
        verify(repository, times(1)).deleteById(blue.getId());
    }
}