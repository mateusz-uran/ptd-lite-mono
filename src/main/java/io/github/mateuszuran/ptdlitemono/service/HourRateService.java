package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.service.logic.json.pojo.UserRates;
import io.github.mateuszuran.ptdlitemono.exception.UserNotFoundException;
import io.github.mateuszuran.ptdlitemono.service.logic.json.pojo.HourRateJsonSkeleton;
import io.github.mateuszuran.ptdlitemono.service.logic.json.JsonReader;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class HourRateService {
    @Value("${hour-rate.json.link}")
    private String jsonLink;

    private final JsonReader reader;

    public UserRates getUserHourRates(String username) throws IOException {
        return reader.readJsonFile(HourRateJsonSkeleton.class, jsonLink)
                .getUsers()
                .stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst()
                .orElseThrow(UserNotFoundException::new);
    }
}
