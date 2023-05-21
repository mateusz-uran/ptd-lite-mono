package io.github.mateuszuran.ptdlitemono.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "card_trips")
@Data
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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "group_id")
    private TripGroup group;
}
