package io.github.mateuszuran.ptdlitemono.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "trip_group")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TripGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cargoName;
    private Integer temperature;
    private Integer weight;
    private List<Long> tripsIds;
}
