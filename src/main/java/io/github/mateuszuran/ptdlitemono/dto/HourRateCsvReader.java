package io.github.mateuszuran.ptdlitemono.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HourRateCsvReader {
    private List<UserRates> users;
}
