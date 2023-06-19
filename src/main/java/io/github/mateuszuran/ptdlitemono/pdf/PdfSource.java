package io.github.mateuszuran.ptdlitemono.pdf;

import io.github.mateuszuran.ptdlitemono.dto.response.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PdfSource {
    private PdfCsvReader pdfCsvReader;
    private String cardNumber;
    private List<TripResponse> cardTripsList;
    private List<FuelResponse> cardFuelsList;
    private List<AdBlueResponse> cardAdBlueList;
    private Counters counters;
}
