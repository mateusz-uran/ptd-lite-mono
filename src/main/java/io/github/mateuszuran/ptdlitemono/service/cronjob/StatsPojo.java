package io.github.mateuszuran.ptdlitemono.service.cronjob;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatsPojo {
    private Integer cardCounter;
    private Integer cardMileage;
}
