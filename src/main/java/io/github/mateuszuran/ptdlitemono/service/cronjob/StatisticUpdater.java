package io.github.mateuszuran.ptdlitemono.service.cronjob;

import io.github.mateuszuran.ptdlitemono.model.CardStatistics;
import io.github.mateuszuran.ptdlitemono.repository.CardStatisticsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.YearMonth;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Objects;

@Slf4j
@Component
public class StatisticUpdater {

    public void updateOrCreateStatistics(
            String username,
            Map<YearMonth, StatsPojo> cardStatisticsMap,
            Map<YearMonth, StatsPojo> statisticMap,
            CardStatisticsRepository statisticsRepository) {
        for (Map.Entry<YearMonth, StatsPojo> entry : cardStatisticsMap.entrySet()) {

            YearMonth yearMonth = entry.getKey();
            StatsPojo cardStats = entry.getValue();

            if (statisticMap.containsKey(yearMonth)) {
                StatsPojo existingStatistic = statisticMap.get(yearMonth);

                if (!Objects.equals(cardStats.getCardCounter(), existingStatistic.getCardCounter())
                        || !Objects.equals(cardStats.getCardMileage(), existingStatistic.getCardMileage())) {

                    CardStatistics statisticToUpdate = statisticsRepository.findByYearMonthAndUsername(yearMonth, username)
                            .orElseThrow(() -> new NoSuchElementException("Card statistic with date " + yearMonth + " cannot be found."));
                    statisticToUpdate.setCardCounter(cardStats.getCardCounter());
                    statisticToUpdate.setCardMileage(cardStats.getCardMileage());
                    statisticsRepository.save(statisticToUpdate);
                    log.info("Updated statistic from: " + yearMonth);
                }
            } else {
                CardStatistics newStatistic = new CardStatistics();
                newStatistic.setUsername(username);
                newStatistic.setYearMonth(yearMonth);
                newStatistic.setCardCounter(cardStats.getCardCounter());
                newStatistic.setCardMileage(cardStats.getCardMileage());
                statisticsRepository.save(newStatistic);
                log.info("Created statistic for: " + yearMonth);
            }
        }
    }
}
