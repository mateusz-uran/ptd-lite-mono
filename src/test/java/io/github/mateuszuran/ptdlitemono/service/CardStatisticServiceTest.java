package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.helpers.PTDModelHelpers;
import io.github.mateuszuran.ptdlitemono.mapper.CardStatisticMapper;
import io.github.mateuszuran.ptdlitemono.repository.CardStatisticsRepository;
import io.github.mateuszuran.ptdlitemono.service.async.AsyncStatisticService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.YearMonth;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@Slf4j
@ExtendWith(MockitoExtension.class)
class CardStatisticServiceTest {
    private CardStatisticService service;
    @Mock
    private CardStatisticsRepository repository;
    @Mock
    private CardStatisticMapper mapper;
    private PTDModelHelpers helpers;

    @BeforeEach
    void setUp() {
        service = new CardStatisticService(repository, mapper);
        helpers = new PTDModelHelpers();
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
}