package io.github.mateuszuran.ptdlitemono.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdBlueResponse {
    private Long id;
    private String adBlueDate;
    private String adBlueLocalization;
    private Integer adBlueAmount;
}
