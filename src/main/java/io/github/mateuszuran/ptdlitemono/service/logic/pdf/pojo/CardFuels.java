package io.github.mateuszuran.ptdlitemono.service.logic.pdf.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardFuels {
    private Long id;
    private String refuelingDate;
    private String refuelingLocation;
    private Integer vehicleCounter;
    private Integer refuelingAmount;
    private String paymentMethod;
}
