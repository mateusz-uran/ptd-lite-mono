package io.github.mateuszuran.ptdlitemono.service.async;

import org.springframework.stereotype.Service;

import java.time.Month;

@Service
public class CardStatisticsService {
    public void incrementCardCounterPerMonth(int year, Month month) {
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
    }

    public void sumCarMileageInMonth(Integer carMileage, Month month, int year) {
        //call repo to find month in year
        //var stat = repository.findByYearAndMonth(year, month)
        //if not exists create new object
        //var updatedMileage = stat.getMileage() + carMileage
        //repo.save(updatedMileage)
    }
}
