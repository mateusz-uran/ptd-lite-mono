package io.github.mateuszuran.ptdlitemono.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.YearMonth;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardStatisticResponse {
    private Long id;
    private int cardMileage;
    private int cardCounter;
    private YearMonth yearMonth;
}
