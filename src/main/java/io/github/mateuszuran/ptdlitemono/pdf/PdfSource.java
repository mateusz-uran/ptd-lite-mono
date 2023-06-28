package io.github.mateuszuran.ptdlitemono.pdf;

import io.github.mateuszuran.ptdlitemono.dto.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.dto.FuelResponse;
import io.github.mateuszuran.ptdlitemono.dto.PdfCsvReader;
import io.github.mateuszuran.ptdlitemono.dto.TripResponse;
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
    private CardAdditionalInfo info;
}
