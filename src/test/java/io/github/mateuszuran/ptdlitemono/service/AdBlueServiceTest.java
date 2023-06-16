package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
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
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@Slf4j
@ExtendWith(MockitoExtension.class)
class AdBlueServiceTest {
    private AdBlueService service;
    @Mock
    private CardService cardService;
    @Mock
    private AdBlueRepository repository;
    @Mock
    private FuelMapper mapper;

    @BeforeEach
    void setUp() {
        service = new AdBlueService(cardService, repository, mapper);
    }

    @Test
    void givenAdBlueAndCardId_whenSave_thenUpdateCardWithAdBlue() {
        //given
        List<AdBlue> emptyList = new ArrayList<>();
        Card card = Card.builder().id(123L).number("ABC").adBlue(emptyList).build();
        AdBlueRequest request = AdBlueRequest.builder()
                .adBlueDate("1.01")
                .adBlueLocalization("Warsaw")
                .adBlueAmount(5)
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

    @Test
    void givenCardId_whenGetAllBlue_thenReturnMappedList() {
        AdBlue blue1 = AdBlue.builder().adBlueAmount(300).build();
        when(repository.findAllAdBluesByCardId(anyLong())).thenReturn(Optional.of(List.of(blue1)));
        AdBlueResponse response1 = AdBlueResponse.builder().adBlueAmount(300).build();
        when(mapper.mapToAdBlueResponse(blue1)).thenReturn(response1);
        //when
        var result = service.retrieveAdBlue(anyLong());
        //then
        assertEquals(result, List.of(response1));
    }

    @Test
    void givenBlueId_whenUpdate_ThenReturnUpdatedObject() {
        Long blueId = 123L;
        AdBlue blue = AdBlue.builder()
                .id(blueId)
                .adBlueDate("1.05.2023")
                .adBlueLocalization("Warsaw")
                .adBlueAmount(500)
                .build();
        when(repository.findById(blueId)).thenReturn(Optional.of(blue));

        AdBlueRequest request = AdBlueRequest.builder().adBlueAmount(350).build();

        AdBlue updatedBlue = AdBlue.builder()
                .id(blueId)
                .adBlueDate("1.05.2023")
                .adBlueLocalization("Warsaw")
                .adBlueAmount(350)
                .build();

        AdBlueResponse expectedResponse = AdBlueResponse.builder()
                .id(blueId)
                .adBlueDate("1.05.2023")
                .adBlueLocalization("Warsaw")
                .adBlueAmount(350)
                .build();

        when(repository.save(blue)).thenReturn(updatedBlue);
        when(mapper.mapToAdBlueResponse(updatedBlue)).thenReturn(expectedResponse);

        //when
        var result = service.updateAdBlue(request, blueId);

        //then
        verify(repository).findById(blueId);
        verify(mapper).merge(eq(request), eq(blue));
        verify(repository).save(blue);
        verify(mapper).mapToAdBlueResponse(updatedBlue);

        assertEquals(expectedResponse, result);
    }
}