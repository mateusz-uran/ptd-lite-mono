package io.github.mateuszuran.ptdlitemono.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.mateuszuran.ptdlitemono.dto.HourRateCsvReader;
import io.github.mateuszuran.ptdlitemono.dto.UserRates;
import io.github.mateuszuran.ptdlitemono.exception.CsvFileException;
import io.github.mateuszuran.ptdlitemono.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class HourRateService {
    @Value("${hour-rate.json.link}")
    private String jsonLink;

    public UserRates getUserHourRateValues(String username) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            URL url = new URL(jsonLink);
            InputStreamReader reader = new InputStreamReader(url.openStream(), StandardCharsets.UTF_8);
            var mappedJSON =  objectMapper.readValue(reader, HourRateCsvReader.class);
            return mappedJSON.getUsers().stream().filter(user -> user.getUsername().equals(username))
                    .findFirst()
                    .orElseThrow(UserNotFoundException::new);
        } catch (IOException e) {
            e.printStackTrace();
            throw new IOException("Failed to retrieve JSON data: " + e.getMessage(), e);
        }
    }
}
