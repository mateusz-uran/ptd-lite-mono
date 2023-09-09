package io.github.mateuszuran.ptdlitemono.service.cronjob;

import io.github.mateuszuran.ptdlitemono.model.CardStatistics;
import io.github.mateuszuran.ptdlitemono.repository.CardStatisticsRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.YearMonth;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@Slf4j
@ExtendWith(MockitoExtension.class)
class StatisticUpdaterTest {
    @InjectMocks
    private StatisticUpdater updater;
    @Mock
    private CardStatisticsRepository cardStatisticsRepository;

    @BeforeEach
    void setup() {
        updater = new StatisticUpdater();
    }

    @Test
    void givenUsernameAndTwoMaps_whenStatisticUpToDate_thenUpdate() {
        //given
        String username = "johndoe123";
        YearMonth yearMonth = YearMonth.of(2023, 9);
        StatsPojo mapToCopy = new StatsPojo(3, 751);
        StatsPojo mapToUpdate = new StatsPojo(2, 516);
        CardStatistics statisticToUpdate = CardStatistics.builder()
                .username(username)
                .yearMonth(yearMonth)
                .cardCounter(mapToUpdate.getCardCounter())
                .cardMileage(mapToUpdate.getCardMileage())
                .build();

        Map<YearMonth, StatsPojo> cardStatisticsMap = new HashMap<>();
        cardStatisticsMap.put(yearMonth, mapToCopy);

        Map<YearMonth, StatsPojo> statisticMap = new HashMap<>();
        statisticMap.put(yearMonth, mapToUpdate);

        when(cardStatisticsRepository.findByYearMonthAndUsername(yearMonth, username))
                .thenReturn(Optional.of(statisticToUpdate));

        //when
        updater.updateOrCreateStatistics(username, cardStatisticsMap, statisticMap, cardStatisticsRepository);

        //then
        verify(cardStatisticsRepository, times(1)).findByYearMonthAndUsername(yearMonth, username);

        ArgumentCaptor<CardStatistics> captor = ArgumentCaptor.forClass(CardStatistics.class);
        verify(cardStatisticsRepository).save(captor.capture());
        CardStatistics updatedCardStatistics = captor.getValue();
        assertEquals(updatedCardStatistics.getCardCounter(), mapToCopy.getCardCounter());
        assertEquals(updatedCardStatistics.getCardMileage(), mapToCopy.getCardMileage());
    }

    @Test
    void givenUsernameAndTwoMaps_whenNotExists_thenCreate() {
        //given
        String username = "johndoe123";
        YearMonth existingYearMonth = YearMonth.of(2023, 9);
        YearMonth nonExistingYearMonth = YearMonth.of(2023, 6);
        StatsPojo mapToAdd = new StatsPojo(3, 751);
        StatsPojo mapToCheck = new StatsPojo(2, 516);

        Map<YearMonth, StatsPojo> cardStatisticsMap = new HashMap<>();
        cardStatisticsMap.put(nonExistingYearMonth, mapToAdd);

        Map<YearMonth, StatsPojo> statisticMap = new HashMap<>();
        statisticMap.put(existingYearMonth, mapToCheck);
        //when
        updater.updateOrCreateStatistics(username, cardStatisticsMap, statisticMap, cardStatisticsRepository);
        //then

        ArgumentCaptor<CardStatistics> captor = ArgumentCaptor.forClass(CardStatistics.class);
        verify(cardStatisticsRepository).save(captor.capture());
        CardStatistics newCardStatistics = captor.getValue();
        assertEquals(newCardStatistics.getCardCounter(), mapToAdd.getCardCounter());
        assertEquals(newCardStatistics.getCardMileage(), mapToAdd.getCardMileage());
    }
}