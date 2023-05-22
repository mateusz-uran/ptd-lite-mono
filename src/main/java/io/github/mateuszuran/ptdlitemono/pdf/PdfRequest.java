package io.github.mateuszuran.ptdlitemono.pdf;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PdfRequest {
    private String number;
    private List<CardTrips> cardTripsList;
    private List<CardFuels> cardFuelsList;
    private List<CardAdBlue> cardAdBlueList;
}