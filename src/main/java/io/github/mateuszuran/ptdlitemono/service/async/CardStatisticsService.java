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
import java.util.NoSuchElementException;
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
                .ifPresentOrElse(statistics -> {
                    var cardCounter = new AtomicInteger(statistics.getCardCounter());
                    cardCounter.addAndGet(1);
                    statistics.setCardCounter(cardCounter.get());
                    repository.save(statistics);
                }, () -> {
                    CardStatistics statistic = CardStatistics.builder()
                            .username(username)
                            .yearMonth(yearMonth)
                            .cardCounter(1)
                            .cardMileage(0)
                            .build();
                    repository.save(statistic);
                });
        log.info("Card counter per month has been increased.");
    }

    @Async("ptdLiteTaskExecutor")
    public void decrementCardCounterPerMonth(LocalDateTime cardCreationTime, String username) {
        var yearMonth = cardCreationTime.query(YearMonth::from);
        repository.findByYearMonthAndUsername(yearMonth, username)
                .ifPresent(statistics -> {
                    var cardCounter = new AtomicInteger(statistics.getCardCounter());
                    cardCounter.addAndGet(-1);
                    statistics.setCardCounter(cardCounter.get());
                    repository.save(statistics);
                    log.info("Card counter per month has been decreased.");
                });
    }

    @Async("ptdLiteTaskExecutor")
    public void sumCarMileageInMonth(List<Trip> trips, String username) {
        var mapTripDateMileage = mapDayEndFromTrips(trips);
        updateOrCrateCardMileage(mapTripDateMileage, username);
        log.info("Car mileage per month has been increased.");
    }

    @Async("ptdLiteTaskExecutor")
    public void removeCarMileageInMonth(List<Trip> trips, String username) {
        var mapTripDateMileage = mapDayEndFromTrips(trips);
        updateCardMileageWhenDeletedTrip(mapTripDateMileage, username);
        log.info("Car mileage per month has been decreased.");
    }

    @Async("ptdLiteTaskExecutor")
    public void updateCarMileageInMonth(Trip trip, int diff, String username) {
        updateCardMileageWhenUpdatedTrip(trip, diff, username);
        log.info("Car mileage per month has been updated dew to trip update.");
    }

    private void updateCardMileageWhenUpdatedTrip(Trip trip, int tripMileageDifference, String username) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        var tripYearMonth = YearMonth.parse(trip.getDayEnd(), formatter);
        var result = repository.findByYearMonthAndUsername(tripYearMonth, username)
                .orElseThrow(() -> new NoSuchElementException("Statistics not found"));
        var summedMileage = new AtomicInteger(result.getCardMileage());
        summedMileage.addAndGet(tripMileageDifference);
        result.setCardMileage(summedMileage.get());
        repository.save(result);
    }

    private void updateCardMileageWhenDeletedTrip(Map<YearMonth, Integer> mappedTripDateAndMileage, String username) {
        mappedTripDateAndMileage.forEach((key, value) -> repository.findByYearMonthAndUsername(key, username)
                .ifPresent(statistic -> {
                    var summedMileage = new AtomicInteger(statistic.getCardMileage());
                    summedMileage.addAndGet(-value);
                    statistic.setCardMileage(summedMileage.get());
                    repository.save(statistic);
                }));
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
                            .cardCounter(1)
                            .build();
                    repository.save(statistic);
                }));
    }
}
