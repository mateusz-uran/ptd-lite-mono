package io.github.mateuszuran.ptdlitemono.service.async;

import io.github.mateuszuran.ptdlitemono.repository.CardStatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Month;

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

    public void sumCarMileageInMonth(Integer carMileage, Month month, int year) {
        //call repo to find month in year
//        var statistic = repository.findByYearAndMonth(year, month.getValue());
        //var stat = repository.findByYearAndMonth(year, month)
        //if not exists create new object
        //var updatedMileage = stat.getMileage() + carMileage
        //repo.save(updatedMileage)
    }
}
