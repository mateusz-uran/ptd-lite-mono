package io.github.mateuszuran.ptdlitemono.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("it")
@AutoConfigureMockMvc
class TripControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private TripRepository repository;
    @Autowired
    private CardRepository cardRepository;
    private Card card;

    @AfterEach
    void flush() {
        repository.deleteAll();
    }

    @BeforeEach
    void setUp() {
        card = Card.builder().username("admin").number("ABC")
                .creationTime(LocalDateTime.of(2023, 5, 1, 12, 0)).build();
        cardRepository.save(card);
    }

    @Test
    void givenCardIdAndTripList_whenPost_thenReturnStatus() throws Exception {
        //given
        Trip trip1 = Trip.builder().counterStart(200).counterEnd(300).card(card).build();
        Trip trip2 = Trip.builder().counterStart(300).counterEnd(400).card(card).build();
        //when + then
        mockMvc.perform(post("/api/trip")
                        .param("cardId", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(List.of(trip1, trip2))))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    void givenCardIdAndIdList_whenDelete_thenReturnStatus() throws Exception {
        //given
        Trip trip1 = Trip.builder().counterStart(200).counterEnd(300).card(card).build();
        Trip trip2 = Trip.builder().counterStart(300).counterEnd(400).card(card).build();
        repository.saveAllAndFlush(List.of(trip1, trip2));
        //when + then
        mockMvc.perform(delete("/api/trip")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(List.of(trip1.getId(), trip2.getId()))))
                .andExpect(status().isNoContent())
                .andDo(print());
    }
}