package io.github.mateuszuran.ptdlitemono.repository;

import io.github.mateuszuran.ptdlitemono.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {

    boolean existsByNumberIgnoreCaseAndUsername(String number, String username);

    Optional<Card> findById(Long id);


    @Query(value = "SELECT * FROM Cards WHERE username=:username AND creation_time BETWEEN :start AND :end ORDER BY creation_time DESC", nativeQuery = true)
    List<Card> findAllByUsernameAndCreationTimeBetweenAndOrderByCreationTimeDesc(String username, LocalDateTime start, LocalDateTime end);

    @Query(value = "SELECT * FROM Cards WHERE username=:username ORDER BY creation_time DESC LIMIT 3", nativeQuery = true)
    List<Card> findLastThreeEntitiesByUsernameAndOrderByCreationTime(String username);

    @Query("SELECT DISTINCT c FROM Card c LEFT JOIN FETCH c.trips WHERE c.username = :username")
    List<Card> findAllByUsername(String username);
}
