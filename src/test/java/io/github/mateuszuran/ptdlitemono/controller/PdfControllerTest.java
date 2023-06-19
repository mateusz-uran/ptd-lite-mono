package io.github.mateuszuran.ptdlitemono.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.mateuszuran.ptdlitemono.pdf.CardDetailsResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(value = "user123")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("it")
@AutoConfigureMockMvc
class PdfControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void givenUsernameAndPdfRequest_whenGenerate_thenReturnByteArray() throws Exception {
        mockMvc.perform(post("/api/pdf/generate")
                        .param("username", "will")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(dataForPdf())))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andDo(print());
    }

    @Test
    void givenUsernameAndPdfRequest_whenUserNotFound_thenThrowException() throws Exception {
        mockMvc.perform(post("/api/pdf/generate")
                        .param("username", "abraham")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(dataForPdf())))
                .andExpect(status().isForbidden())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(jsonPath("$.description").value("User not found in csv file, please contact admin."));
    }

    private CardDetailsResponse dataForPdf() {
        TripResponse trip1 = TripResponse.builder()
                .counterStart(200)
                .counterEnd(300)
                .carMileage(100)
                .build();
        TripResponse trip2 = TripResponse.builder()
                .counterStart(300)
                .counterEnd(400)
                .carMileage(100)
                .build();
        TripResponse trip3 = TripResponse.builder()
                .counterStart(400)
                .counterEnd(500)
                .carMileage(100)
                .build();

        FuelResponse fuel1 = FuelResponse.builder()
                .vehicleCounter(200)
                .refuelingAmount(50)
                .build();
        FuelResponse fuel2 = FuelResponse.builder()
                .vehicleCounter(360)
                .refuelingAmount(70)
                .build();

        return CardDetailsResponse.builder()
                .cardNumber("ABC")
                .trips(List.of(trip1, trip2, trip3))
                .fuels(List.of(fuel1, fuel2))
                .build();
    }
}