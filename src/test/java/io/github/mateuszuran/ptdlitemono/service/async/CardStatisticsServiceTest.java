package io.github.mateuszuran.ptdlitemono.service.async;

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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@Slf4j
@ExtendWith(MockitoExtension.class)
class CardStatisticsServiceTest {
    private CardStatisticsService service;
    @Mock
    private CardStatisticsRepository repository;

    @BeforeEach
    void setUp() {
        service = new CardStatisticsService(repository);
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
    void givenTripsAndUsername_whenStatisticExists_thenSumNewMileage() {
        //given
        List<Trip> trips = createTripWithMileage();
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
        assertEquals(1298, savedStatistic.getCardMileage());
    }

    @Test
    void givenTripsAndUsername_whenStatisticNotExists_thenCreateNewStatistic() {
        //given
        List<Trip> trips = createTripWithMileage();
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
        assertEquals(1293, savedStatistic.getCardMileage());
    }

    private List<Trip> createTripWithMileage() {
        List<Trip> trips = new ArrayList<>();
        Trip trip1 = Trip.builder()
                .dayStart("01.07.2023")
                .dayEnd("01.07.2023")
                .carMileage(500)
                .build();
        Trip trip2 = Trip.builder()
                .dayStart("02.07.2023")
                .dayEnd("03.07.2023")
                .carMileage(321)
                .build();
        Trip trip3 = Trip.builder()
                .dayStart("03.07.2023")
                .dayEnd("05.07.2023")
                .carMileage(472)
                .build();
        trips.add(trip1);
        trips.add(trip2);
        trips.add(trip3);
        return trips;
    }
}