package io.github.mateuszuran.ptdlitemono.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.YearMonth;

@Entity
@Table(name = "card_statistics")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CardStatistics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private YearMonth yearMonth;
    private Integer cardMileage;
}
