package io.github.mateuszuran.ptdlitemono.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardRequest {
    private String number;
    private String username;
}