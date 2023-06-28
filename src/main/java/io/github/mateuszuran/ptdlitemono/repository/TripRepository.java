package io.github.mateuszuran.ptdlitemono.repository;

import io.github.mateuszuran.ptdlitemono.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TripRepository extends JpaRepository<Trip, Long> {

    Optional<List<Trip>> findAllByIdIn(List<Long> tripIds);

    Optional<List<Trip>> findAllTripsByCardId(Long cardId);
}
