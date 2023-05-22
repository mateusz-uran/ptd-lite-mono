package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.FuelRequest;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.repository.FuelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public void delete(Long id) {
        repository.findById(id)
                .ifPresent(fuel -> repository.deleteById(fuel.getId()));
    }
}