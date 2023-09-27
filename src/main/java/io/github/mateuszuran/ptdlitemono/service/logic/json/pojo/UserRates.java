package io.github.mateuszuran.ptdlitemono.service.logic.json.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserRates {
    String username;
    String defaultRate;
    List<Map<String, Float>> rates;
}
