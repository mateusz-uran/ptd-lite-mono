package io.github.mateuszuran.ptdlitemono.repository;

import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdBlueRepository extends JpaRepository<AdBlue, Long> {
    Optional<List<AdBlue>> findAllAdBluesByCardId(Long cardId);
}
