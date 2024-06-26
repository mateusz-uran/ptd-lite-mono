package io.github.mateuszuran.ptdlitemono.service.cronjob;

import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.CardStatistics;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import io.github.mateuszuran.ptdlitemono.repository.CardStatisticsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class StatisticCollector {
    private final CardStatisticsRepository statisticsRepository;
    private final CardRepository cardRepository;
    private final StatisticUpdater updater;

    public void statisticExecutor(String username) {
        List<CardStatistics> statistic = statisticsRepository.findAllByUsername(username);
        List<Card> cards = cardRepository.findAllByUsername(username);

        Map<YearMonth, StatsPojo> statisticMap = gatherExistingStatistics(statistic);
        Map<YearMonth, StatsPojo> cardStatisticsMap = gatherActualCardInformation(cards);

        updater.updateOrCreateStatistics(username, cardStatisticsMap, statisticMap, statisticsRepository);
    }

    public Map<YearMonth, StatsPojo> gatherExistingStatistics(List<CardStatistics> statistic) {
        return statistic.stream()
                .collect(Collectors.toMap(
                        CardStatistics::getYearMonth,
                        stat -> new StatsPojo(stat.getCardCounter(), stat.getCardMileage())));
    }

    public Map<YearMonth, StatsPojo> gatherActualCardInformation(List<Card> cards) {
        var cardsStream = cards.stream()
                .collect(Collectors.groupingBy(
                        card -> YearMonth.from(card.getCreationTime()),
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                cardsInside -> createStatsPojo(cardsInside, YearMonth.from(cardsInside.get(0).getCreationTime()))
                        )
                ));
        log.info("Card stream: " + cardsStream);
        return cardsStream;
    }

    private static StatsPojo createStatsPojo(List<Card> cardsInside, YearMonth cardCreationMonth) {
        int cardCounter = cardsInside.size();
        int mileage = calculateMileage(cardsInside, cardCreationMonth);
        return new StatsPojo(cardCounter, mileage);
    }

    private static int calculateMileage(List<Card> cardsInside, YearMonth cardCreationMonth) {
        return cardsInside.stream()
                .flatMap(card -> card.getTrips().stream())
                .filter(trip -> {
                    YearMonth tripEndMonth = YearMonth.from(parseDate(trip.getDayEnd()));
                    return tripEndMonth.equals(cardCreationMonth);
                })
                .filter(trip -> isValidDate(trip.getDayEnd()))
                .mapToInt(Trip::getCarMileage)
                .sum();
    }


    private static boolean isValidDate(String date) {
        try {
            LocalDate.parse(date, DateTimeFormatter.ofPattern("dd.MM.yyyy"));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private static LocalDate parseDate(String date) {
        return LocalDate.parse(date, DateTimeFormatter.ofPattern("dd.MM.yyyy"));
    }
}
