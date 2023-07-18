package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.HourRateCsvReader;
import io.github.mateuszuran.ptdlitemono.exception.UserNotFoundException;
import io.github.mateuszuran.ptdlitemono.service.logic.CsvReader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class HourRateService {
    private final CsvReader csvReader;
    @Value("${hour-rate.csv.link}")
    private String hourRateCsvLink;

    public HourRateCsvReader getUserHourRateValues(String username) {
        return csvReader.readCsvFile(HourRateCsvReader.class, hourRateCsvLink).stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst()
                .orElseThrow(UserNotFoundException::new);
    }

    public void readValues() {
        var result = getUserHourRateValues("jarcok091");
        log.info(result.getRatePerKm());
    }
}
