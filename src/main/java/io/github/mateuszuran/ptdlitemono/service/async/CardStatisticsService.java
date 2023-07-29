package io.github.mateuszuran.ptdlitemono.service.async;

import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.CardStatistics;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.CardStatisticsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Month;
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

    @Async("ptdLiteTaskExecutor")
    public void incrementCardCounterPerMonth(int year, Month month) throws InterruptedException {
        //CardStats model
        //Long id
        //Integer year
        //String month
        //Integer counter
        //Integer mileage

        //call repo to find month in year
        //var stat = repository.findByYearAndMonth(year, month)
        //if not exists create new object
        //increment counter for cards
        //stat.counter++
        //repo.save(stat)
        Thread.sleep(5000);
        System.out.println("Execute method asynchronously. "
                + Thread.currentThread().getName());
    }

    @Async("ptdLiteTaskExecutor")
    public void sumCarMileageInMonth(List<Trip> trips, String username) {
        var mapTripDateMileage = mapDayEndFromTrips(trips);
        updateOrCreateStatistic(mapTripDateMileage, username);
    }

    Map<YearMonth, Integer> mapDayEndFromTrips(List<Trip> trips) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        return trips.stream()
                .collect(Collectors.toMap(
                        trip -> YearMonth.parse(trip.getDayEnd(), formatter),
                        Trip::getCarMileage
                ));
    }

    void updateOrCreateStatistic(Map<YearMonth, Integer> mappedTripDateAndMileage, String username) {
        mappedTripDateAndMileage.forEach((key, value) -> repository.findByYearMonth(key, username).ifPresentOrElse(statistic -> {
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
