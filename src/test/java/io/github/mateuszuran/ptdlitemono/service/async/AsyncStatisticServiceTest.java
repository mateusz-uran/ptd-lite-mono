package io.github.mateuszuran.ptdlitemono.service.async;

import io.github.mateuszuran.ptdlitemono.helpers.PTDModelHelpers;
import io.github.mateuszuran.ptdlitemono.mapper.CardStatisticMapper;
import io.github.mateuszuran.ptdlitemono.model.CardStatistics;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.CardStatisticsRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@Slf4j
@ExtendWith(MockitoExtension.class)
class AsyncStatisticServiceTest {
    private AsyncStatisticService service;
    @Mock
    private CardStatisticsRepository repository;
    private PTDModelHelpers helpers;

    @BeforeEach
    void setUp() {
        service = new AsyncStatisticService(repository);
        helpers = new PTDModelHelpers();
    }

    @Test
    void givenCardCreationTimeAndUsername_whenExists_thenIncrementCardCounterByOne() {
        //given
        String username = "testUser";
        LocalDateTime creationTime = LocalDateTime.now();
        var yearMonth = creationTime.query(YearMonth::from);
        int initialCardCounter = 5;

        CardStatistics existingStat = CardStatistics.builder()
                .username(username)
                .yearMonth(yearMonth)
                .cardCounter(initialCardCounter)
                .build();
        when(repository.findByYearMonthAndUsername(yearMonth, username)).thenReturn(Optional.of(existingStat));
        //when
        service.incrementCardCounterPerMonth(creationTime, username);
        //then
        verify(repository, times(1)).findByYearMonthAndUsername(yearMonth, username);
        verify(repository, times(1)).save(any(CardStatistics.class));
        assertEquals(initialCardCounter + 1, existingStat.getCardCounter());
    }

    @Test
    void givenCardCreationTimeAndUsername_whenNonExisting_thenCreateNewOne() {
        //given
        String username = "testUser";
        LocalDateTime creationTime = LocalDateTime.now();
        var yearMonth = creationTime.query(YearMonth::from);
        when(repository.findByYearMonthAndUsername(yearMonth, username)).thenReturn(Optional.empty());
        //when
        service.incrementCardCounterPerMonth(creationTime, username);
        //then
        verify(repository, times(1)).findByYearMonthAndUsername(yearMonth, username);
        verify(repository, times(1)).save(any(CardStatistics.class));

        ArgumentCaptor<CardStatistics> captor = ArgumentCaptor.forClass(CardStatistics.class);
        verify(repository).save(captor.capture());
        CardStatistics newCardStatistics = captor.getValue();
        assertEquals(username, newCardStatistics.getUsername());
        assertEquals(yearMonth, newCardStatistics.getYearMonth());
        assertEquals(1, newCardStatistics.getCardCounter());
    }

    @Test
    void givenCardCreationTimeAndUsername_whenExists_thenDecrementCardCounterByOne() {
        //given
        String username = "testUser";
        LocalDateTime creationTime = LocalDateTime.now();
        var yearMonth = creationTime.query(YearMonth::from);
        int initialCardCounter = 5;

        CardStatistics existingStat = CardStatistics.builder()
                .username(username)
                .yearMonth(yearMonth)
                .cardCounter(initialCardCounter)
                .build();
        when(repository.findByYearMonthAndUsername(yearMonth, username)).thenReturn(Optional.of(existingStat));
        //when
        service.decrementCardCounterPerMonth(creationTime, username);
        //then
        verify(repository, times(1)).findByYearMonthAndUsername(yearMonth, username);
        verify(repository, times(1)).save(any(CardStatistics.class));
        assertEquals(initialCardCounter - 1, existingStat.getCardCounter());
    }

    @Test
    void givenTripsAndUsername_whenStatisticExists_thenSumNewMileage() {
        //given
        List<Trip> trips = helpers.createTripsModel();
        String username = "john_doe";
        Integer initialCardMileage = 5;
        CardStatistics existingStat = CardStatistics.builder()
                .username(username)
                .yearMonth(YearMonth.of(2023, 7))
                .cardMileage(initialCardMileage)
                .build();
        when(repository.findByYearMonthAndUsername(YearMonth.of(2023, 7), username)).thenReturn(Optional.of(existingStat));

        //when
        service.sumCarMileageInMonth(trips, username);

        //then
        verify(repository, times(1)).findByYearMonthAndUsername(YearMonth.of(2023, 7), username);
        ArgumentCaptor<CardStatistics> captor = ArgumentCaptor.forClass(CardStatistics.class);
        verify(repository).save(captor.capture());
        CardStatistics savedStatistic = captor.getValue();
        assertEquals(username, savedStatistic.getUsername());
        assertEquals(YearMonth.of(2023, 7), savedStatistic.getYearMonth());
        //714 - sum of carMileage from each trip + initialCardMileage
        assertEquals(714, savedStatistic.getCardMileage());
    }

    @Test
    void givenTripsAndUsername_whenStatisticNotExists_thenCreateStatisticAndSumMileage() {
        //given
        List<Trip> trips = helpers.createTripsModel();
        String username = "john_doe";
        when(repository.findByYearMonthAndUsername(YearMonth.of(2023, 7), username)).thenReturn(Optional.empty());

        //when
        service.sumCarMileageInMonth(trips, username);
        //then

        verify(repository, times(1)).findByYearMonthAndUsername(YearMonth.of(2023, 7), username);
        ArgumentCaptor<CardStatistics> captor = ArgumentCaptor.forClass(CardStatistics.class);
        verify(repository).save(captor.capture());
        CardStatistics savedStatistic = captor.getValue();
        assertEquals(username, savedStatistic.getUsername());
        assertEquals(YearMonth.of(2023, 7), savedStatistic.getYearMonth());
        //709 - sum of carMileage from each trip
        assertEquals(709, savedStatistic.getCardMileage());
    }

    @Test
    void givenTripListAndUsername_whenDeleteTrips_thenDecreaseCarMileage() {
        //given
        String username = "jonhdoe123";
        int year = 2023;
        int month = 1;
        Trip trip = Trip.builder()
                .dayStart("01.01.2023")
                .dayEnd("02.01.2023")
                .counterStart(500)
                .counterEnd(600)
                .carMileage(100)
                .build();
        CardStatistics statistics = CardStatistics.builder()
                .username(username)
                .yearMonth(YearMonth.of(year, month))
                .cardMileage(200)
                .build();
        when(repository.findByYearMonthAndUsername(YearMonth.of(year, month), username)).thenReturn(Optional.of(statistics));
        //when
        service.removeCarMileageInMonth(List.of(trip), username);
        //then
        verify(repository, times(1)).findByYearMonthAndUsername(YearMonth.of(2023, 1), username);
        ArgumentCaptor<CardStatistics> captor = ArgumentCaptor.forClass(CardStatistics.class);
        verify(repository).save(captor.capture());
        CardStatistics savedStatistic = captor.getValue();
        assertEquals(username, savedStatistic.getUsername());
        assertEquals(YearMonth.of(2023, 1), savedStatistic.getYearMonth());
        //100 - sum of carMileage from each trip after removing existing trip
        assertEquals(100, savedStatistic.getCardMileage());
    }

    @Test
    void givenTripAndDifferenceInMileage_whenExists_thenUpdateCarMileage() {
        //given
        String username = "jonhdoe123";
        int year = 2023;
        int month = 1;
        int mileageDiff = 50;
        Trip trip = Trip.builder()
                .dayEnd("02.01.2023")
                .build();
        CardStatistics statistics = CardStatistics.builder()
                .username(username)
                .yearMonth(YearMonth.of(year, month))
                .cardMileage(200)
                .build();
        when(repository.findByYearMonthAndUsername(YearMonth.of(year, month), username)).thenReturn(Optional.of(statistics));
        //when
        service.updateCarMileageInMonth(trip, mileageDiff, username);
        //then
        verify(repository, times(1)).findByYearMonthAndUsername(YearMonth.of(2023, 1), username);
        ArgumentCaptor<CardStatistics> captor = ArgumentCaptor.forClass(CardStatistics.class);
        verify(repository).save(captor.capture());
        CardStatistics savedStatistic = captor.getValue();
        assertEquals(username, savedStatistic.getUsername());
        assertEquals(YearMonth.of(2023, 1), savedStatistic.getYearMonth());
        //250 - sum of carMileage from each trip after updating one trip mileage
        assertEquals(250, savedStatistic.getCardMileage());
    }
}