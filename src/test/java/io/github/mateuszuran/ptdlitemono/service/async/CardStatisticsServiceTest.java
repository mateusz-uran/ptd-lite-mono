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
class CardStatisticsServiceTest {
    private CardStatisticsService service;
    @Mock
    private CardStatisticsRepository repository;
    @Mock
    private CardStatisticMapper mapper;
    private PTDModelHelpers helpers;

    @BeforeEach
    void setUp() {
        service = new CardStatisticsService(repository, mapper);
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
    void givenYear_whenFindAllFromYear_thenReturnStatisticOfTheYear() {
        //given
        int year = 2022;
        String username = "johndoe123";
        var statistic = helpers.createCardStatisticListWithRandomMonth(username, year);
        var statResponse = helpers.createCardStatisticResponseListWithRandomMonth();

        var beginningOfTheYear = YearMonth.of(year, 1);
        var endOfTheYear = YearMonth.of(year, 12);
        when(repository.findAllByYearMonthRangeAndUsername(beginningOfTheYear, endOfTheYear, username)).thenReturn(Optional.of(statistic));

        when(mapper.mapToCardStatisticResponse(statistic.get(0))).thenReturn(statResponse.get(0));
        when(mapper.mapToCardStatisticResponse(statistic.get(1))).thenReturn(statResponse.get(1));
        when(mapper.mapToCardStatisticResponse(statistic.get(2))).thenReturn(statResponse.get(2));
        //when
        var result = service.getAllStatisticByYearAndUsername(year, username);
        //then
        assertEquals(statResponse, result);
        assertEquals(statResponse.get(0), result.get(0));
        assertEquals(statResponse.get(0).getCardCounter(), result.get(0).getCardCounter());
        assertEquals(590, result.get(2).getCardMileage());
    }

    @Test
    void givenYear_whenNoStatExistsInYear_thenThrowException() {
        //given
        int year = 2022;
        String username = "johndoe123";
        var beginningOfTheYear = YearMonth.of(year, 1);
        var endOfTheYear = YearMonth.of(year, 12);
        when(repository.findAllByYearMonthRangeAndUsername(beginningOfTheYear, endOfTheYear, username)).thenReturn(Optional.empty());
        //when + then
        assertThatThrownBy(() -> service.getAllStatisticByYearAndUsername(year, username))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("No statistics found for the given criteria.");
    }

    @Test
    void givenYearAndMonth_whenStatExists_thenReturnFromSpecificYearAndMonth() {
        //given
        int year = 2022;
        int month = 6;
        String username = "johndoe123";
        var fakeCardStats = helpers.createCardStatisticListWithSpecificYearAndMonth(username, year, month);
        var fakeCardStatResponse = helpers.createCardStatisticResponseListWithSpecificYearAndMonth(year, month);
        when(repository.findByYearMonthAndUsername(YearMonth.of(year, month), username)).thenReturn(Optional.of(fakeCardStats));
        when(mapper.mapToCardStatisticResponse(fakeCardStats)).thenReturn(fakeCardStatResponse);
        //when
        var result = service.getAllStatisticByYearAndMonthAndUsername(year, month, username);
        //then
        assertEquals(fakeCardStatResponse, result);
        assertEquals(year, result.getYearMonth().getYear());
        assertEquals(month, result.getYearMonth().getMonth().getValue());
    }

    @Test
    void givenYearAndMonth_whenNoStatExistsInYearAndMonth_thenThrowException() {
        //given
        int year = 2022;
        int month = 6;
        String username = "johndoe123";
        when(repository.findByYearMonthAndUsername(YearMonth.of(year, month), username)).thenReturn(Optional.empty());
        //when + then
        assertThatThrownBy(() -> service.getAllStatisticByYearAndMonthAndUsername(year, month, username))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("No statistics found for the given criteria.");
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