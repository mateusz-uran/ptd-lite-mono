package io.github.mateuszuran.ptdlitemono.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.mateuszuran.ptdlitemono.dto.request.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.repository.AdBlueRepository;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import io.github.mateuszuran.ptdlitemono.repository.FuelRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser(value = "user123")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("it")
@AutoConfigureMockMvc
class FuelControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private FuelRepository repository;
    @Autowired
    private AdBlueRepository adBlueRepository;
    @Autowired
    private CardRepository cardRepository;
    private Card card;

    @BeforeEach
    void setUp() {
        card = Card.builder().username("user123").number("ABC")
                .creationTime(LocalDateTime.of(2023, 5, 1, 12, 0)).build();
        cardRepository.save(card);
    }

    @AfterEach
    void flush() {
        repository.deleteAll();
    }

    @Test
    void givenCardIdAndFuelObject_whenPost_thenReturnStatus() throws Exception {
        //given
        Fuel fuel = Fuel.builder().vehicleCounter(1500).refuelingAmount(300).build();
        //when + then
        mockMvc.perform(post("/api/fuel/petrol/addmultiple")
                        .param("cardId", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(List.of(fuel))))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    void givenFuelId_whenDelete_thenReturnStatus() throws Exception {
        //given
        Fuel fuel = Fuel.builder().vehicleCounter(1500).refuelingAmount(300).build();
        repository.saveAndFlush(fuel);
        //when + then
        mockMvc.perform(delete("/api/fuel/petrol/delete")
                        .param("fuelId", String.valueOf(fuel.getId()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andDo(print());
    }

    @Test
    void givenFuelId_whenNoData_thenReturnError() throws Exception {
        mockMvc.perform(delete("/api/fuel/petrol/delete")
                        .param("fuelId", String.valueOf(123L))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Petrol data is empty"));
    }

    @Test
    void givenCardId_whenGetFuels_thenReturnMappedPetrolList() throws Exception {
        //given
        Fuel fuel1 = Fuel.builder().vehicleCounter(1500).refuelingAmount(300).card(card).build();
        Fuel fuel2 = Fuel.builder().vehicleCounter(1800).refuelingAmount(230).card(card).build();
        repository.saveAll(List.of(fuel1, fuel2));
        //when + then
        mockMvc.perform(get("/api/fuel/petrol")
                        .param("cardId", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()", is(2)));
    }

    @Test
    void givenCardId_whenGetAdBlue_thenReturnMappedBlueList() throws Exception {
        //given
        AdBlue blue1 = AdBlue.builder().adBlueAmount(300).adBlueLocalization("Warsaw").card(card).build();
        adBlueRepository.save(blue1);
        //when + then
        mockMvc.perform(get("/api/fuel/blue")
                        .param("cardId", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()", is(1)));
    }

    @Test
    void givenCardId_whenNoPetrolData_thenThrowException() throws Exception {
        mockMvc.perform(get("/api/fuel/petrol")
                        .param("cardId", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Petrol data is empty"));
    }

    @Test
    void givenBlueId_whenDelete_thenReturnNoContent() throws Exception {
        AdBlue blue = AdBlue.builder()
                .adBlueDate("1.05.2023")
                .adBlueLocalization("Warsaw")
                .adBlueAmount(500)
                .build();
        adBlueRepository.save(blue);
        mockMvc.perform(delete("/api/fuel/blue/delete")
                        .param("blueId", String.valueOf(blue.getId()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andDo(print());
    }

    @Test
    void givenBlueId_whenNoBlueData_thenThrowException() throws Exception {
        mockMvc.perform(delete("/api/fuel/blue/delete")
                        .param("blueId", String.valueOf(123L))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("AdBlue data is empty"));
    }

    @Test
    void givenFuelId_whenUpdate_thenReturnUpdatedObject() throws Exception {
        Fuel fuelToUpdate = Fuel.builder()
                .refuelingDate("1.05.2023")
                .refuelingLocation("Warsaw")
                .vehicleCounter(123456)
                .refuelingAmount(500)
                .paymentMethod("e500")
                .build();
        repository.saveAndFlush(fuelToUpdate);
        FuelRequest request = FuelRequest.builder().refuelingAmount(123).build();
        mockMvc.perform(patch("/api/fuel/petrol/update")
                        .param("fuelId", String.valueOf(fuelToUpdate.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.refuelingAmount").value(123));
    }

    @Test
    void givenFuelId_whenUpdate_thenReturnError() throws Exception {
        Long fuelId = 123L;
        FuelRequest request = FuelRequest.builder().refuelingAmount(123).build();
        mockMvc.perform(patch("/api/fuel/petrol/update")
                        .param("fuelId", String.valueOf(fuelId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Petrol data is empty"));

    }

    @Test
    void givenBlueId_whenUpdate_thenReturnUpdatedObject() throws Exception {
        AdBlue blueToUpdate = AdBlue.builder()
                .adBlueDate("1.05.2023")
                .adBlueLocalization("Warsaw")
                .adBlueAmount(500)
                .build();
        adBlueRepository.saveAndFlush(blueToUpdate);
        AdBlueRequest request = AdBlueRequest.builder().adBlueAmount(123).build();
        mockMvc.perform(patch("/api/fuel/blue/update")
                        .param("blueId", String.valueOf(blueToUpdate.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.adBlueAmount").value(123));
    }

    @Test
    void givenBlueId_whenUpdate_thenReturnError() throws Exception {
        Long blueId = 123L;
        AdBlueRequest request = AdBlueRequest.builder().adBlueAmount(123).build();
        mockMvc.perform(patch("/api/fuel/blue/update")
                        .param("blueId", String.valueOf(blueId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("AdBlue data is empty"));

    }

    @Test
    void givenFuelList_whenSave_thenReturnStatusCreated() throws Exception {
        //given
        var fuels = createFuelRequests();
        //when + then
        mockMvc.perform(post("/api/fuel/petrol/addmultiple")
                        .param("cardId", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(fuels)))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    void givenAdBlueList_whenSave_thenReturnStatusCreated() throws Exception {
        //given
        var blues = createBlueRequests();
        //when + then
        mockMvc.perform(post("/api/fuel/blue/addmultiple")
                        .param("cardId", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(blues)))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    private List<FuelRequest> createFuelRequests() {
        List<FuelRequest> fuels = new ArrayList<>();
        FuelRequest fuel1 = FuelRequest.builder().refuelingAmount(300).build();
        FuelRequest fuel2 = FuelRequest.builder().refuelingAmount(400).build();
        FuelRequest fuel3 = FuelRequest.builder().refuelingAmount(500).build();
        FuelRequest fuel4 = FuelRequest.builder().refuelingAmount(600).build();
        fuels.add(fuel1);
        fuels.add(fuel2);
        fuels.add(fuel3);
        fuels.add(fuel4);
        // Add fuel request objects to the list
        return fuels;
    }

    private List<AdBlueRequest> createBlueRequests() {
        List<AdBlueRequest> blues = new ArrayList<>();
        AdBlueRequest blue1 = AdBlueRequest.builder().adBlueDate("1.01").build();
        AdBlueRequest blue2 = AdBlueRequest.builder().adBlueDate("2.01").build();
        AdBlueRequest blue3 = AdBlueRequest.builder().adBlueDate("3.01").build();
        AdBlueRequest blue4 = AdBlueRequest.builder().adBlueDate("4.01").build();
        blues.add(blue1);
        blues.add(blue2);
        blues.add(blue3);
        blues.add(blue4);
        return blues;
    }
}