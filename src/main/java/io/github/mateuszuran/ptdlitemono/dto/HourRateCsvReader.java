package io.github.mateuszuran.ptdlitemono.dto;

import com.opencsv.bean.CsvBindByPosition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HourRateCsvReader {
    @CsvBindByPosition(position = 0)
    private String username;
    @CsvBindByPosition(position = 1)
    private String ratePerKm;
    @CsvBindByPosition(position = 2)
    private String ratePerDE;
    @CsvBindByPosition(position = 3)
    private String ratePerBE;
    @CsvBindByPosition(position = 4)
    private String ratePerFR;
}
