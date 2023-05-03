package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.FuelRequest;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.repository.FuelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FuelServiceTest {
    private FuelService service;
    @Mock
    private CardService cardService;
    @Mock
    private FuelRepository repository;
    @Mock
    private FuelMapper mapper;

    @BeforeEach
    void setUp() {
        service = new FuelService(cardService, mapper, repository);
    }

    @Test
    void givenFuelObjectAndCardId_whenSave_thenDoNothing() {
        //given
        Card card = Card.builder().id(anyLong()).number("XYZ").build();
        when(cardService.checkIfCardExists(card.getId())).thenReturn(card);
        FuelRequest request = FuelRequest.builder().refuelingAmount(300).build();
        Fuel fuel = Fuel.builder().refuelingAmount(300).build();
        when(mapper.mapToFuelRequest(request)).thenReturn(fuel);
        //when
        service.addRefuelling(request, anyLong());
        //then
        verify(repository, times(1)).save(fuel);
    }

    @Test
    void delete() {
        //given
        Fuel fuel = Fuel.builder().refuelingAmount(300).build();
        when(repository.findById(anyLong())).thenReturn(Optional.of(fuel));
        //when
        service.delete(anyLong());
        //then
        verify(repository, times(1)).deleteById(fuel.getId());
    }
}