package io.github.mateuszuran.ptdlitemono.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TripGroupRequest {
    private String cargoName;
    private Integer temperature;
    private Integer weight;
    private List<Long> tripsIds;
}
