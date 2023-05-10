package io.github.mateuszuran.ptdlitemono.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
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
        Fuel fuel = Fuel.builder().vehicleCounter(1500).refuelingAmount(300).card(card).build();
        //when + then
        mockMvc.perform(post("/api/fuel")
                        .param("id", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(fuel)))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    void givenCardIdAndIdList_whenDelete_thenReturnStatus() throws Exception {
        //given
        Fuel fuel = Fuel.builder().vehicleCounter(1500).refuelingAmount(300).card(card).build();
        repository.saveAndFlush(fuel);
        //when + then
        mockMvc.perform(delete("/api/fuel")
                        .param("id", String.valueOf(fuel.getId()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andDo(print());
    }
}