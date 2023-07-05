package io.github.mateuszuran.ptdlitemono.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "card_adblue")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdBlue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String adBlueDate;
    private String adBlueLocalization;
    private Integer adBlueAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    @JsonBackReference
    private Card card;
}
