package io.github.mateuszuran.ptdlitemono.service.logic.json.pojo;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HourRateJsonSkeleton {
    private List<UserRates> users;
}
