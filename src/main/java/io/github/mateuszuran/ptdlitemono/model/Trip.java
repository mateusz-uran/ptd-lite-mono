package io.github.mateuszuran.ptdlitemono.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "card_trips")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dayStart;
    private String hourStart;
    private String locationStart;
    private String dayEnd;
    private String hourEnd;
    private String locationEnd;
    private String countryStart;
    private String countryEnd;
    private Integer counterStart;
    private Integer counterEnd;
    private Integer carMileage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private Card card;
}
