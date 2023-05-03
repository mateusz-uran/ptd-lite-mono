package io.github.mateuszuran.ptdlitemono.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "card_fuels")
@Data
public class Fuel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String refuelingDate;
    private String refuelingLocation;
    private Integer vehicleCounter;
    private Integer refuelingAmount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", nullable = false)
    private Card card;
}
