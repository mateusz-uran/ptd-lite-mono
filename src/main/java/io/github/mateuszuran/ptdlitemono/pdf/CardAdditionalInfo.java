package io.github.mateuszuran.ptdlitemono.pdf;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardAdditionalInfo {
    private String fuelInitialState;
    private String fuelEndState;
    private String aggregateInitialState;
    private String aggregateAdBlue;
    private String aggregateEndState;
    private String avgFuelConsumption;
    private String totalFuelConsumption;
    private String avgSpeed;
    private String fuelConsumptionIdle;
    private String fuelConsumptionUneconomical;
}
