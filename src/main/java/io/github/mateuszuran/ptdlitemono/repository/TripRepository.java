package io.github.mateuszuran.ptdlitemono.repository;

import io.github.mateuszuran.ptdlitemono.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TripRepository extends JpaRepository<Trip, Long> {

    Optional<List<Trip>> findAllByIdIn(List<Long> tripIds);

    Optional<List<Trip>> findAllTripsByCardId(Long cardId);

    @Query(value = "SELECT * FROM Trip WHERE cardId=:cardId ORDER BY counterEnd LIMIT 1", nativeQuery = true)
    Trip findAllTripsByCardIdOrderByCounterEnd(Long cardId);

    Trip findTopByCardIdOrderByCounterEndDesc(Long cardId);
}
