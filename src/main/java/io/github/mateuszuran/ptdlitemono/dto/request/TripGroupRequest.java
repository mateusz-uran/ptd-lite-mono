package io.github.mateuszuran.ptdlitemono.dto.request;

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
    private Integer weight;
    private Integer temperature;
    private String notes;
    private List<Long> tripIds;
}
