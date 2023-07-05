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
public class TripGroupResponse {
    private Long id;
    private String cargoName;
    private List<Long> tripIds;
}
