package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.exception.PetrolEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.mapper.GenericMapper;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.repository.FuelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FuelService {
    private final CardService service;
    private final FuelMapper fuelMapper;
    private final FuelRepository repository;
    private final GenericMapper genericMapper;

    public void addMultipleFuels(List<FuelRequest> fuels, Long cardId) {
        var card = service.checkIfCardExists(cardId);
        var fuelsToSave = fuels.stream().map(singleFuel -> {
            var fuel = genericMapper.mapToEntityModel(singleFuel, Fuel.class);
            card.addFuel(fuel);
            return fuel;
        }).toList();
        repository.saveAll(fuelsToSave);
    }

    public void deleteFuel(Long fuelId) {
        var fuelToDelete = repository.findById(fuelId).orElseThrow(PetrolEmptyException::new);
        repository.delete(fuelToDelete);
    }

    public List<FuelResponse> getAllFuelsFromCard(Long cardId) {
        var fuels = repository.findAllFuelsByCardId(cardId).orElseThrow(PetrolEmptyException::new);
        if (fuels.isEmpty()) {
            throw new PetrolEmptyException();
        } else {
            return fuels
                    .stream()
                    .map(fuelMapper::mapToFuelResponse)
                    .sorted(Comparator.comparing(FuelResponse::getVehicleCounter))
                    .toList();
        }
    }

    public FuelResponse updateSingleFuel(FuelRequest request, Long fuelId) {
        var fuel = repository.findById(fuelId).orElseThrow(PetrolEmptyException::new);
        genericMapper.mergeTwoDifferentObjects(request, fuel);
        var updatedFuel =  repository.save(fuel);
        return fuelMapper.mapToFuelResponse(updatedFuel);
    }
}