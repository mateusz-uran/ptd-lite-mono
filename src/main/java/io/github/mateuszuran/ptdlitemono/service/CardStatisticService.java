package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.response.CardStatisticResponse;
import io.github.mateuszuran.ptdlitemono.mapper.CardStatisticMapper;
import io.github.mateuszuran.ptdlitemono.repository.CardStatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardStatisticService {
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
}
