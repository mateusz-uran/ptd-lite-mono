package io.github.mateuszuran.ptdlitemono.mapper;

import io.github.mateuszuran.ptdlitemono.config.ModelMapperConfig;
import io.github.mateuszuran.ptdlitemono.dto.response.CardStatisticResponse;
import io.github.mateuszuran.ptdlitemono.model.CardStatistics;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CardStatisticMapper {
    private final ModelMapperConfig mapper;

    public CardStatisticResponse mapToCardStatisticResponse(CardStatistics statistics) {
        return mapper.modelMapper().map(statistics, CardStatisticResponse.class);
    }
}
