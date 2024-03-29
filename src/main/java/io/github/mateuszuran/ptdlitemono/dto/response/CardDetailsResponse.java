package io.github.mateuszuran.ptdlitemono.dto.response;

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
