package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.FuelRequest;
import io.github.mateuszuran.ptdlitemono.dto.FuelResponse;
import io.github.mateuszuran.ptdlitemono.exception.PetrolEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.repository.FuelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FuelService {
    private final CardService service;
    private final FuelMapper fuelMapper;
    private final FuelRepository repository;

    public void addRefuelling(FuelRequest fuelDto, Long id) {
        var card = service.checkIfCardExists(id);
        var fuel = fuelMapper.mapToFuelRequest(fuelDto);
        card.getFuels().add(fuel);
        service.updateCard(card);
    }

    public void deleteFuel(Long fuelId) {
        var fuelToDelete = repository.findById(fuelId).orElseThrow(PetrolEmptyException::new);
        repository.delete(fuelToDelete);
    }

    public List<FuelResponse> retrieveFuels(Long cardId) {
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

    public FuelResponse updateFuel(FuelRequest request, Long fuelId) {
        var fuel = repository.findById(fuelId).orElseThrow(PetrolEmptyException::new);
        fuelMapper.merge(request, fuel);
        var updatedFuel =  repository.save(fuel);
        return fuelMapper.mapToFuelResponse(updatedFuel);
    }
}