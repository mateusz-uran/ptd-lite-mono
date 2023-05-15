package io.github.mateuszuran.ptdlitemono.repository;

import io.github.mateuszuran.ptdlitemono.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    boolean existsByNumberIgnoreCaseAndUsername(String number, String username);

    Optional<Card> findById(Long id);

    List<Card> findAllByUsernameAndCreationTimeBetween(String username, LocalDateTime start, LocalDateTime end);
}
