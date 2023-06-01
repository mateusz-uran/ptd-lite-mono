package io.github.mateuszuran.ptdlitemono.dto.response;

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
    private String date;
    private String localization;
    private Integer amount;
}
