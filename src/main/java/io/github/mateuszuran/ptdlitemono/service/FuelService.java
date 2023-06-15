package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.exception.PetrolEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.repository.FuelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FuelService {
    private final CardService service;
    private final FuelMapper fuelMapper;
    private final FuelRepository repository;

    public void addRefuelling(FuelRequest fuelDto, Long id) {
        var card = service.checkIfCardExists(id);
        Fuel fuelToSave = Fuel.builder()
                .refuelingDate(fuelDto.getRefuelingDate())
                .refuelingLocation(fuelDto.getRefuelingLocation())
                .vehicleCounter(fuelDto.getVehicleCounter())
                .refuelingAmount(fuelDto.getRefuelingAmount())
                .paymentMethod(fuelDto.getPaymentMethod())
                .build();
        card.addFuel(fuelToSave);
        repository.save(fuelToSave);
    }

    public void delete(Long id) {
        repository.findById(id)
                .ifPresent(fuel -> repository.deleteById(fuel.getId()));
    }

    public List<FuelResponse> retrieveFuels(Long cardId) {
        var fuels = repository.findAllFuelsByCardId(cardId).orElseThrow(PetrolEmptyException::new);
        if (fuels.isEmpty()) {
            throw new PetrolEmptyException();
        } else {
            return fuels
                    .stream()
                    .map(fuelMapper::mapToFuelResponseWithModelMapper)
                    .toList();
        }
    }

    public FuelResponse updateFuel(FuelRequest request, Long fuelId) {
        var fuel = repository.findById(fuelId).orElseThrow(PetrolEmptyException::new);
        fuelMapper.merge(request, fuel);
        var updatedFuel =  repository.save(fuel);
        return fuelMapper.mapToFuelResponseWithModelMapper(updatedFuel);
    }
}