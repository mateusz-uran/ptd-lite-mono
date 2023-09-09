package io.github.mateuszuran.ptdlitemono.service.cronjob;

import io.github.mateuszuran.ptdlitemono.helpers.PTDModelHelpers;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import io.github.mateuszuran.ptdlitemono.repository.CardStatisticsRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.YearMonth;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasKey;
import static org.hamcrest.Matchers.hasValue;

@Slf4j
@ExtendWith(MockitoExtension.class)
class StatisticCollectorTest {
    private StatisticCollector collector;
    @Mock
    private CardStatisticsRepository statisticsRepository;
    @Mock
    private CardRepository cardRepository;
    @Mock
    private StatisticUpdater updater;
    private PTDModelHelpers helpers;


    @BeforeEach
    void setUp() {
        collector = new StatisticCollector(statisticsRepository, cardRepository, updater);
        helpers = new PTDModelHelpers();
    }

    @Test
    void givenCardStatisticList_whenStream_thenReturnMapWithYearMonthAndStatsPojo() {
        //given
        String username = "johndoe123";
        var stats = helpers.createCardStatisticListWithRandomMonth(username, 2023);
        StatsPojo expectedStatPojo = new StatsPojo(2,300);
        YearMonth expectedYearMonth = YearMonth.of(2023, 6);
        //when
        var map = collector.gatherExistingStatistics(stats);
        //then
        assertThat(map.size(), is(3));
        assertThat(map, hasKey(expectedYearMonth));
        assertThat(map, hasValue(expectedStatPojo));
    }

    @Test
    void givenCardsList_whenStream_thenReturnMapWithYearMonthAndStatsPojo() {
        //given
        String username = "johndoe123";
        LocalDateTime creationTimeFirstCard = LocalDateTime.of(2023, 5, 13, 16, 45);
        LocalDateTime creationTimeSecondCard = LocalDateTime.of(2023, 6, 3, 12, 12);
        StatsPojo expectedStatPojo = new StatsPojo(1,800);
        var cards = helpers.cardModelFroStatistic(username, creationTimeFirstCard, creationTimeSecondCard);
        //when
        var map = collector.gatherActualCardInformation(cards);
        //then
        assertThat(map.size(), is(2));
        assertThat(map, hasKey(YearMonth.of(2023, 6)));
        assertThat(map, hasKey(YearMonth.of(2023, 5)));
        assertThat(map, hasValue(expectedStatPojo));
    }
}