package io.github.mateuszuran.ptdlitemono.repository;

import io.github.mateuszuran.ptdlitemono.model.CardStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.YearMonth;
import java.util.Optional;

public interface CardStatisticsRepository extends JpaRepository<CardStatistics, Long> {

    @Query("SELECT cs FROM CardStatistics cs WHERE cs.yearMonth = :yearMonth AND cs.username = :username")
    Optional<CardStatistics> findByYearMonthAndUsername(@Param("yearMonth") YearMonth yearMonth, @Param("username") String username);
}
