package io.github.mateuszuran.ptdlitemono.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdBlueRequest {
    private String adBlueDate;
    private String adBlueLocalization;
    private Integer adBlueAmount;
}
