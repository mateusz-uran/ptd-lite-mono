package io.github.mateuszuran.ptdlitemono.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TripGroup {
    private Long id;
    private String cargoName;
    private Integer temperature;
    private Integer weight;
}
