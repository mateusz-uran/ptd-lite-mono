package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.dto.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.exception.AdBlueEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
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

    @BeforeEach
    void setUp() {
        service = new AdBlueService(cardService, repository, mapper);
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
        service.deleteBlue(blue.getId());
        //then
        verify(repository, times(1)).delete(blue);
    }

    @Test
    void givenBlueId_whenNotFound_thenThrowException() {
        //given
        when(repository.findById(anyLong())).thenReturn(Optional.empty());
        //when + then
        assertThatThrownBy(() -> service.deleteBlue(anyLong()))
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