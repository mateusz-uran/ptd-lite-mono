package io.github.mateuszuran.ptdlitemono.pdf;

import io.github.mateuszuran.ptdlitemono.dto.PdfCsvReader;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PdfTemplateSource {
    private PdfCsvReader pdfCsvReader;
    private String cardNumber;
    private List<CardTrips> cardTripsList;
    private List<CardFuels> cardFuelsList;
    private List<CardAdBlue> cardAdBlueList;
    private Counters counters;
    private CardAdditionalInfo info;
}