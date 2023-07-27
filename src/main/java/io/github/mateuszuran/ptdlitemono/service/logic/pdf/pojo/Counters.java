package io.github.mateuszuran.ptdlitemono.service.logic.pdf.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Counters {
    private Integer firstCounter;
    private Integer lastCounter;
    private Integer mileage;
    private Integer refuelingSum;
}
