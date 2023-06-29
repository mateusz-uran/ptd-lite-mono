package io.github.mateuszuran.ptdlitemono.repository;

import io.github.mateuszuran.ptdlitemono.model.Fuel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FuelRepository extends JpaRepository<Fuel, Long> {
    Optional<List<Fuel>> findAllFuelsByCardId(Long cardId);
}
