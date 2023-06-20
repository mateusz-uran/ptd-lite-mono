package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.FuelRequest;
import io.github.mateuszuran.ptdlitemono.dto.FuelResponse;
import io.github.mateuszuran.ptdlitemono.exception.PetrolEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.repository.FuelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
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
        List<Fuel> emptyFuelList = new ArrayList<>();
        //given
        Card card = Card.builder().id(anyLong()).number("XYZ").fuels(emptyFuelList).build();
        when(cardService.checkIfCardExists(card.getId())).thenReturn(card);
        FuelRequest request = FuelRequest.builder().refuelingAmount(300).build();
        Fuel fuel = Fuel.builder().refuelingAmount(300).build();
        when(mapper.mapToFuelRequest(request)).thenReturn(fuel);
        //when
        service.addRefuelling(request, anyLong());
        //then
        var updatedCard = cardService.checkIfCardExists(card.getId());
        assertThat(updatedCard.getFuels()).isEqualTo(List.of(fuel));
    }

    @Test
    void givenFuelId_whenNotFound_thenThrowException() {
        //given
        when(repository.findById(anyLong())).thenReturn(Optional.empty());
        //when + then
        assertThatThrownBy(() -> service.deleteFuel(anyLong()))
                .isInstanceOf(PetrolEmptyException.class)
                .hasMessageContaining("Petrol data is empty");
    }

    @Test
    void givenCardId_whenGet_thenReturnMappedFuels() {
        //given
        Fuel fuel1 = Fuel.builder().refuelingAmount(500).vehicleCounter(300).build();
        Fuel fuel2 = Fuel.builder().refuelingAmount(300).vehicleCounter(600).build();
        when(repository.findAllFuelsByCardId(anyLong())).thenReturn(Optional.of(List.of(fuel1, fuel2)));
        FuelResponse response1 = FuelResponse.builder().refuelingAmount(500).vehicleCounter(300).build();
        FuelResponse response2 = FuelResponse.builder().refuelingAmount(300).vehicleCounter(600).build();
        when(mapper.mapToFuelResponse(fuel1)).thenReturn(response1);
        when(mapper.mapToFuelResponse(fuel2)).thenReturn(response2);
        //when
        var result = service.retrieveFuels(anyLong());
        //then
        assertEquals(List.of(response1, response2), result);
    }

    @Test
    void givenFuelIdAndFuelDto_whenUpdate_thenReturnFuelResponse() {
        //given
        Long fuelId = 123L;
        Fuel fuel = Fuel.builder()
                .id(fuelId)
                .refuelingDate("1.05.2023")
                .refuelingLocation("Warsaw")
                .vehicleCounter(123456)
                .refuelingAmount(500)
                .paymentMethod("e500")
                .build();
        when(repository.findById(fuelId)).thenReturn(Optional.of(fuel));

        FuelRequest request = FuelRequest.builder().refuelingAmount(350).build();

        Fuel updatedFuel = Fuel.builder()
                .id(fuelId)
                .refuelingDate("1.05.2023")
                .refuelingLocation("Warsaw")
                .vehicleCounter(123456)
                .refuelingAmount(350)
                .paymentMethod("e500")
                .build();

        FuelResponse expectedResponse = FuelResponse.builder()
                .id(fuelId)
                .refuelingDate("1.05.2023")
                .refuelingLocation("Warsaw")
                .vehicleCounter(123456)
                .refuelingAmount(350)
                .paymentMethod("e500")
                .build();

        when(repository.save(fuel)).thenReturn(updatedFuel);
        when(mapper.mapToFuelResponse(updatedFuel)).thenReturn(expectedResponse);

        //when
        FuelResponse result = service.updateFuel(request, fuelId);

        //then
        verify(repository).findById(fuelId);
        verify(mapper).merge(eq(request), eq(fuel));
        verify(repository).save(fuel);
        verify(mapper).mapToFuelResponse(updatedFuel);

        assertEquals(expectedResponse, result);
    }
}