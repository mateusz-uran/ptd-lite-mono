package io.github.mateuszuran.ptdlitemono.model;

import io.github.mateuszuran.ptdlitemono.service.logic.dateconverter.YearMonthDateAttributeConverter;
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
    @Version
    private Long version;
    private String username;
    @Column(name = "year_month", columnDefinition = "DATE")
    @Convert(converter = YearMonthDateAttributeConverter.class)
    private YearMonth yearMonth;
    private Integer cardMileage;
    private Integer cardCounter;
}
