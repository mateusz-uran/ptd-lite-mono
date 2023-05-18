package io.github.mateuszuran.ptdlitemono.repository;

import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TripGroupRepository extends JpaRepository<TripGroup, Long> {
    Optional<TripGroup> findByCargoName(String cargoName);
}
