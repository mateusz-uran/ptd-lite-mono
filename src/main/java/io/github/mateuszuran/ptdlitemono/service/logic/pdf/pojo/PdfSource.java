package io.github.mateuszuran.ptdlitemono.service.logic.pdf.pojo;

import io.github.mateuszuran.ptdlitemono.dto.response.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.service.logic.csv.UserPdfInformationSkeleton;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PdfSource {
    private UserPdfInformationSkeleton userPdfSkeleton;
    private String cardNumber;
    private List<TripResponse> cardTripsList;
    private List<FuelResponse> cardFuelsList;
    private List<AdBlueResponse> cardAdBlueList;
    private Counters counters;
    private CardAdditionalInfo info;
}
