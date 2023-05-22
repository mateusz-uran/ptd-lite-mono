package io.github.mateuszuran.ptdlitemono.pdf;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardAdBlue {
    private Long id;
    private String date;
    private String localization;
    private Integer amount;
}
