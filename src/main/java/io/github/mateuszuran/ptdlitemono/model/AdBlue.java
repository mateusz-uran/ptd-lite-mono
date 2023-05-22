package io.github.mateuszuran.ptdlitemono.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "card_adblue")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdBlue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String date;
    private String localization;
    private Integer amount;
}
