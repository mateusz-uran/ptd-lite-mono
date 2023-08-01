package io.github.mateuszuran.ptdlitemono.service;

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

    @Mock
    private JsonReader reader;

    @Value("${hour-rate.json.link}")
    private String jsonLink;

    @BeforeEach
    void setUp() {
        service = new HourRateService(reader);
    }

    @Test
    void givenUsername_whenReadJsonFile_thenReturnRateInformation() throws IOException {
        //given
        String username = "john";
        var userCsvInfo = expectedJsonValues()
                .getUsers()
                .stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst().orElseThrow();
        when(reader.readJsonFile(HourRateJsonSkeleton.class, jsonLink)).thenReturn(expectedJsonValues());
        //when
        var expectedUserInfo = service.getUserHourRates(username);
        //then
        assertEquals(userCsvInfo.getUsername(), expectedUserInfo.getUsername());
        assertEquals(userCsvInfo.getRates(), expectedUserInfo.getRates());
    }

    private HourRateJsonSkeleton expectedJsonValues() {
        Map<String, Float> rates1 = new HashMap<>();
        rates1.put("DE", 15f);
        rates1.put("BE", 18.5f);
        rates1.put("FR", 12.87f);
        rates1.put("NL", 13.56f);

        Map<String, Float> rates2 = new HashMap<>();
        rates2.put("DE", 14.5f);
        rates2.put("BE", 16f);
        rates2.put("FR", 11.53f);
        rates2.put("NL", 14.77f);

        UserRates johnsRates = UserRates.builder()
                .username("john")
                .defaultRate("0.32")
                .rates(List.of(rates1))
                .build();
        UserRates willsRates = UserRates.builder()
                .username("will")
                .defaultRate("0.77")
                .rates(List.of(rates2))
                .build();

        return HourRateJsonSkeleton.builder()
                .users(List.of(johnsRates, willsRates)).build();
    }
}