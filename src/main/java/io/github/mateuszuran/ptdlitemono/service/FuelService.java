package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
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
}