package io.github.mateuszuran.ptdlitemono.service.async;

import io.github.mateuszuran.ptdlitemono.dto.response.CardStatisticResponse;
import io.github.mateuszuran.ptdlitemono.mapper.CardStatisticMapper;
import io.github.mateuszuran.ptdlitemono.model.CardStatistics;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.CardStatisticsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CardStatisticsService {
    private final CardStatisticsRepository repository;
    private final CardStatisticMapper mapper;

    public List<CardStatisticResponse> getAllStatisticByYearAndUsername(int year , String username) {
        var beginningOfTheYear = YearMonth.of(year, 1);
        var endOfTheYear = YearMonth.of(year, 12);
        return repository.findAllByYearMonthRangeAndUsername(beginningOfTheYear, endOfTheYear, username)
                .orElseThrow(() -> new IllegalArgumentException("No statistics found for the given criteria."))
                .stream()
                .map(mapper::mapToCardStatisticResponse)
                .toList();
    }

    public CardStatisticResponse getAllStatisticByYearAndMonthAndUsername(int year, int month, String username) {
        var specificYearAndMonth = YearMonth.of(year, month);
        var result = repository.findByYearMonthAndUsername(specificYearAndMonth, username)
                .orElseThrow(() -> new IllegalArgumentException("No statistics found for the given criteria."));
        return mapper.mapToCardStatisticResponse(result);
    }

    @Async("ptdLiteTaskExecutor")
    public void incrementCardCounterPerMonth(LocalDateTime cardCreationTime, String username) {
        var yearMonth = cardCreationTime.query(YearMonth::from);

        repository.findByYearMonthAndUsername(yearMonth, username)
                .ifPresentOrElse(stat -> {
                    int updatedCardCounter = stat.getCardCounter() + 1;
                    stat.setCardCounter(updatedCardCounter);
                    repository.save(stat);
                }, () -> {
                    CardStatistics statistic = CardStatistics.builder()
                            .username(username)
                            .yearMonth(yearMonth)
                            .cardCounter(1)
                            .cardMileage(0)
                            .build();
                    repository.save(statistic);
                });
    }

    @Async("ptdLiteTaskExecutor")
    public void sumCarMileageInMonth(List<Trip> trips, String username) {
        var mapTripDateMileage = mapDayEndFromTrips(trips);
        updateOrCrateCardMileage(mapTripDateMileage, username);
    }

    private Map<YearMonth, Integer> mapDayEndFromTrips(List<Trip> trips) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        return trips.stream()
                .collect(Collectors.toMap(
                        trip -> YearMonth.parse(trip.getDayEnd(), formatter),
                        Trip::getCarMileage,
                        Integer::sum
                ));
    }

    private void updateOrCrateCardMileage(Map<YearMonth, Integer> mappedTripDateAndMileage, String username) {
        mappedTripDateAndMileage.forEach((key, value) -> repository.findByYearMonthAndUsername(key, username)
                .ifPresentOrElse(statistic -> {
                    var summedMileage = new AtomicInteger(statistic.getCardMileage());
                    summedMileage.addAndGet(value);
                    statistic.setCardMileage(summedMileage.get());
                    repository.save(statistic);
                }, () -> {
                    CardStatistics statistic = CardStatistics.builder()
                            .username(username)
                            .yearMonth(key)
                            .cardMileage(value)
                            .build();
                    repository.save(statistic);
                }));
    }
}
