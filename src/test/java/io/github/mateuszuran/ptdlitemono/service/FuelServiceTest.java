package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlitemono.dto.request.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.exception.PetrolEmptyException;
import io.github.mateuszuran.ptdlitemono.helpers.PTDModelHelpers;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.mapper.GenericMapper;
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
    @Mock
    private GenericMapper genericMapper;
    private PTDModelHelpers helpers;

    @BeforeEach
    void setUp() {
        service = new FuelService(cardService, mapper, repository, genericMapper);
        helpers = new PTDModelHelpers();
    }

    @Test
    void givenFuelList_whenSave_thenDoNothing() {
        //given
        List<Fuel> emptyFuelList = new ArrayList<>();
        Long cardId = 123L;
        Card existingCard = Card.builder().number("XYZ").fuels(emptyFuelList).build();
        when(cardService.checkIfCardExists(cardId)).thenReturn(existingCard);

        var request = helpers.createFuelRequests();
        var response = helpers.createFuelsModel();
        when(genericMapper.mapToEntityModel(request.get(0), Fuel.class)).thenReturn(response.get(0));
        when(genericMapper.mapToEntityModel(request.get(1), Fuel.class)).thenReturn(response.get(1));
        when(genericMapper.mapToEntityModel(request.get(2), Fuel.class)).thenReturn(response.get(2));
        when(genericMapper.mapToEntityModel(request.get(3), Fuel.class)).thenReturn(response.get(3));
        //when
        service.addMultipleFuels(request, cardId);
        //then
        verify(cardService).checkIfCardExists(cardId);
        verify(repository).saveAll(anyList());
    }

    @Test
    void givenFuelId_whenDelete_thenDoNothing() {
        //given
        Fuel fuel1 = Fuel.builder().refuelingAmount(500).vehicleCounter(300).build();
        when(repository.findById(anyLong())).thenReturn(Optional.of(fuel1));
        //when
        service.deleteFuel(anyLong());
        // then
        verify(repository).findById(anyLong());
        verify(repository, times(1)).delete(fuel1);
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
        var result = service.getAllFuelsFromCard(anyLong());
        //then
        assertEquals(List.of(response1, response2), result);
    }

    @Test
    void givenCardId_whenFuelEmpty_thenThrowException() {
        //given
        Long cardId = 123L;
        List<Fuel> emptyList = new ArrayList<>();
        when(repository.findAllFuelsByCardId(cardId)).thenReturn(Optional.of(emptyList));
        //when + then
        assertThatThrownBy(() -> service.getAllFuelsFromCard(cardId))
                .isInstanceOf(PetrolEmptyException.class)
                .hasMessageContaining("Petrol data is empty");
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
        FuelResponse result = service.updateSingleFuel(request, fuelId);

        //then
        verify(repository).findById(fuelId);
        verify(genericMapper).mergeTwoDifferentObjects(eq(request), eq(fuel));
        verify(repository).save(fuel);
        verify(mapper).mapToFuelResponse(updatedFuel);

        assertEquals(expectedResponse, result);
    }
}
