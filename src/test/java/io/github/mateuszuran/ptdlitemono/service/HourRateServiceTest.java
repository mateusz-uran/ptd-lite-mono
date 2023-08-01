package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.helpers.PTDModelHelpers;
import io.github.mateuszuran.ptdlitemono.service.logic.csv.UserPdfInformationSkeleton;
import io.github.mateuszuran.ptdlitemono.service.logic.json.JsonReader;
import io.github.mateuszuran.ptdlitemono.service.logic.json.pojo.HourRateJsonSkeleton;
import io.github.mateuszuran.ptdlitemono.service.logic.json.pojo.UserRates;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class HourRateServiceTest {
    private HourRateService service;
    private PTDModelHelpers helpers;

    @Mock
    private JsonReader reader;

    @Value("${hour-rate.json.link}")
    private String jsonLink;

    @BeforeEach
    void setUp() {
        service = new HourRateService(reader);
        helpers = new PTDModelHelpers();
    }

    @Test
    void givenUsername_whenReadJsonFile_thenReturnRateInformation() throws IOException {
        //given
        String username = "john";
        var userCsvInfo = helpers.expectedJsonValues()
                .getUsers()
                .stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst().orElseThrow();
        when(reader.readJsonFile(HourRateJsonSkeleton.class, jsonLink)).thenReturn(helpers.expectedJsonValues());
        //when
        var expectedUserInfo = service.getUserHourRates(username);
        //then
        assertEquals(userCsvInfo.getUsername(), expectedUserInfo.getUsername());
        assertEquals(userCsvInfo.getRates(), expectedUserInfo.getRates());
    }
}