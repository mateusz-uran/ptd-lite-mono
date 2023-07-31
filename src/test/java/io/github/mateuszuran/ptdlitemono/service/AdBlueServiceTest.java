package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.exception.AdBlueEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.mapper.GenericMapper;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.repository.AdBlueRepository;
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
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdBlueServiceTest {
    private AdBlueService service;
    @Mock
    private CardService cardService;
    @Mock
    private AdBlueRepository repository;
    @Mock
    private FuelMapper mapper;
    @Mock
    private GenericMapper genericMapper;

    @BeforeEach
    void setUp() {
        service = new AdBlueService(cardService, repository, mapper, genericMapper);
    }

    @Test
    void givenBlueId_whenDelete_thenDoNothing() {
        //given
        AdBlue blue = AdBlue.builder()
                .id(55L)
                .adBlueDate("1.01")
                .adBlueLocalization("Warsaw")
                .adBlueAmount(5)
                .build();
        when(repository.findById(blue.getId())).thenReturn(Optional.of(blue));
        //when
        service.deleteSingleAdBlue(blue.getId());
        //then
        verify(repository, times(1)).delete(blue);
    }

    @Test
    void givenBlueId_whenNotFound_thenThrowException() {
        //given
        when(repository.findById(anyLong())).thenReturn(Optional.empty());
        //when + then
        assertThatThrownBy(() -> service.deleteSingleAdBlue(anyLong()))
                .isInstanceOf(AdBlueEmptyException.class)
                .hasMessageContaining("AdBlue data is empty");
    }

    @Test
    void givenCardId_whenGetAllBlue_thenReturnMappedList() {
        AdBlue blue1 = AdBlue.builder().adBlueAmount(300).build();
        when(repository.findAllAdBluesByCardId(anyLong())).thenReturn(Optional.of(List.of(blue1)));
        AdBlueResponse response1 = AdBlueResponse.builder().adBlueAmount(300).build();
        when(mapper.mapToAdBlueResponse(blue1)).thenReturn(response1);
        //when
        var result = service.getAllAdBlueFromCard(anyLong());
        //then
        assertEquals(result, List.of(response1));
    }

    @Test
    void givenCardId_whenAdBlueListEmpty_thenThrowException() {
        //given
        Long cardId = 123L;
        List<AdBlue> emptyList = new ArrayList<>();
        when(repository.findAllAdBluesByCardId(cardId)).thenReturn(Optional.of(emptyList));
        //when + then
        assertThatThrownBy(() -> service.getAllAdBlueFromCard(cardId))
                .isInstanceOf(AdBlueEmptyException.class)
                .hasMessageContaining("AdBlue data is empty");
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
        var result = service.updateSingleAdBlue(request, blueId);

        //then
        verify(repository).findById(blueId);
        verify(genericMapper).mergeTwoDifferentObjects(eq(request), eq(blue));
        verify(repository).save(blue);
        verify(mapper).mapToAdBlueResponse(updatedBlue);

        assertEquals(expectedResponse, result);
    }

    @Test
    void givenFuelList_whenSave_thenDoNothing() {
        //given
        List<AdBlue> emptyBlueList = new ArrayList<>();
        Card card = Card.builder().id(anyLong()).number("XYZ").adBlue(emptyBlueList).build();
        when(cardService.checkIfCardExists(card.getId())).thenReturn(card);
        var request = createBlueRequests();
        var response = createBlues();
        when(mapper.mapToAdBlue(request.get(0))).thenReturn(response.get(0));
        when(mapper.mapToAdBlue(request.get(1))).thenReturn(response.get(1));
        when(mapper.mapToAdBlue(request.get(2))).thenReturn(response.get(2));
        when(mapper.mapToAdBlue(request.get(3))).thenReturn(response.get(3));
        //when
        service.addMultipleAdBlueObjects(request, card.getId());
        //then
        var updatedCard = cardService.checkIfCardExists(card.getId());
        assertThat(updatedCard.getAdBlue()).isEqualTo(response);
    }

    private List<AdBlueRequest> createBlueRequests() {
        List<AdBlueRequest> blues = new ArrayList<>();
        AdBlueRequest blue1 = AdBlueRequest.builder().adBlueDate("1.01").build();
        AdBlueRequest blue2 = AdBlueRequest.builder().adBlueDate("2.01").build();
        AdBlueRequest blue3 = AdBlueRequest.builder().adBlueDate("3.01").build();
        AdBlueRequest blue4 = AdBlueRequest.builder().adBlueDate("4.01").build();
        blues.add(blue1);
        blues.add(blue2);
        blues.add(blue3);
        blues.add(blue4);
        return blues;
    }

    private List<AdBlue> createBlues() {
        List<AdBlue> blues = new ArrayList<>();
        AdBlue blue1 = AdBlue.builder().adBlueDate("1.01").build();
        AdBlue blue2 = AdBlue.builder().adBlueDate("2.01").build();
        AdBlue blue3 = AdBlue.builder().adBlueDate("3.01").build();
        AdBlue blue4 = AdBlue.builder().adBlueDate("4.01").build();
        // Add fuel objects to the list
        blues.add(blue1);
        blues.add(blue2);
        blues.add(blue3);
        blues.add(blue4);
        return blues;
    }
}