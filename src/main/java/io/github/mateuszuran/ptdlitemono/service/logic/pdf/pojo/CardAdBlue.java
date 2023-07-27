package io.github.mateuszuran.ptdlitemono.service.logic.pdf.pojo;

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
    private String adBlueDate;
    private String adBlueLocalization;
    private Integer adBlueAmount;
}
