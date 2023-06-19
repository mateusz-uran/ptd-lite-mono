package io.github.mateuszuran.ptdlitemono.pdf;

import io.github.mateuszuran.ptdlitemono.dto.response.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardDetailsResponse {
    private String cardNumber;
    private List<TripResponse> trips;
    private List<FuelResponse> fuels;
    private List<AdBlueResponse> blue;
}
