package io.github.mateuszuran.ptdlitemono.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRates {
    String username;
    String defaultRate;
    List<Map<String, Float>> rates;
}
