package io.github.mateuszuran.ptdlitemono.dto.response;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardResponse {
    private Long id;
    private String number;
    private String creationTime;
}
