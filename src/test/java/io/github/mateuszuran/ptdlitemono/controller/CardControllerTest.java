package io.github.mateuszuran.ptdlitemono.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.mateuszuran.ptdlitemono.dto.response.CardResponse;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
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
import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WithMockUser(value = "user123")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("it")
@AutoConfigureMockMvc
class CardControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private CardRepository repository;
    @Autowired
    private ObjectMapper mapper;
    private Card card;

    @BeforeEach
    void setUp() {
        card = Card.builder().username("user123").number("ABC")
                .creationTime(LocalDateTime.of(2023, 5, 1, 12, 0)).build();
    }

    @AfterEach
    void flush() {
        repository.deleteAll();
    }

    @Test
    void givenUsernameAndDate_whenFindCards_thenReturnList() throws Exception {
        //given
        Card card2 = Card.builder().username("user123").number("XYZ")
                .creationTime(LocalDateTime.of(2023, 5, 2, 13, 0)).build();
        repository.saveAllAndFlush(List.of(card, card2));

        //when + then
        mockMvc.perform(get("/api/card/all")
                        .param("username", card.getUsername())
                        .param("year", String.valueOf(2023))
                        .param("month", String.valueOf(5))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.size()", is(2)));
    }

    @Test
    void givenUsernameAndDate_whenFindCards_thenReturnEmptyList() throws Exception {
        mockMvc.perform(get("/api/card/all")
                        .param("username", card.getUsername())
                        .param("year", String.valueOf(2023))
                        .param("month", String.valueOf(5))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.size()", is(0)));
    }

    @Test
    void givenCardObjectAndDate_whenSave_thenReturnObject() throws Exception {
        mockMvc.perform(post("/api/card/add")
                        .param("year", String.valueOf(2023))
                        .param("month", String.valueOf(5))
                        .param("dayOfMonth", String.valueOf(12))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(card)))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.number").value(card.getNumber()));
    }

    @Test
    void givenCardObjectAndDate_whenSave_thenStatus() throws Exception {
        mockMvc.perform(post("/api/card/addcard")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(card)))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    void givenCardNumberAndId_whenUpdate_thenReturnUpdatedObject() throws Exception {
        //given
        repository.save(card);
        // when + then
        mockMvc.perform(patch("/api/card")
                        .param("cardId", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("\"test\"")).andExpect(status().isOk())
                .andExpect(jsonPath("$.number").value("\"test\""));
    }

    @Test
    void givenCardObjectAndDate_whenAlreadyExists_thenThrowException() throws Exception {
        //given
        repository.saveAndFlush(card);
        //when
        mockMvc.perform(post("/api/card/add")
                        .param("year", String.valueOf(2023))
                        .param("month", String.valueOf(5))
                        .param("dayOfMonth", String.valueOf(12))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(card)))
                .andExpect(status().isConflict())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Card with number: " + card.getNumber() + " already exists."));
    }

    @Test
    void givenCardObjectAndDate_whenCardNumberIsEmpty_thenThrowException() throws Exception {
        //given
        Card emptyCard = Card.builder().username("admin").number("")
                .creationTime(LocalDateTime.of(2023, 5, 1, 12, 0)).build();
        //when + then
        mockMvc.perform(post("/api/card/add")
                        .param("year", String.valueOf(2023))
                        .param("month", String.valueOf(5))
                        .param("dayOfMonth", String.valueOf(12))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(emptyCard)))
                .andExpect(status().isBadRequest())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Card is empty."));
    }

    @Test
    void givenCardId_whenDelete_thenReturnStatus() throws Exception {
        //given
        repository.save(card);
        //when + then
        mockMvc.perform(delete("/api/card/delete")
                .param("cardId", String.valueOf(card.getId()))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andDo(print());
    }

    @Test
    void givenCardId_whenCardNotFound_thenThrowException() throws Exception {
        // when + then
        mockMvc.perform(delete("/api/card/delete")
                        .param("cardId", String.valueOf(123L))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Card not found."));
    }


    @Test
    void givenCardId_whenGetTripsAndFuels_thenReturnCardDetails() throws Exception {
        Trip trip1 = Trip.builder().counterStart(200).counterEnd(300).build();
        Trip trip2 = Trip.builder().counterStart(300).counterEnd(400).build();
        Trip trip3 = Trip.builder().counterStart(400).counterEnd(500).build();
        Fuel fuel1 = Fuel.builder().vehicleCounter(1500).refuelingAmount(250).build();
        Fuel fuel2 = Fuel.builder().vehicleCounter(1750).refuelingAmount(400).build();
        card.setFuels(List.of(fuel1, fuel2));
        card.setTrips(List.of(trip1, trip2, trip3));
        repository.saveAndFlush(card);
        //when + then
        mockMvc.perform(get("/api/card/details")
                        .param("id", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void givenUsernameAndDates_whenRetrieve_thenReturnMappedCardsList() throws Exception {
        //given
        String username = "admin";
        String firstDatePlainString = "2023-05-01 12:00:00";
        String secondDatePlainString = "2023-05-05 15:30:00";
        repository.saveAll(dummyModelData());
        //when + then
        mockMvc.perform(get("/api/card/archive")
                        .param("username", username)
                        .param("firstDate", firstDatePlainString)
                        .param("secondDate", secondDatePlainString)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()", is(4)));
    }

    private List<Card> dummyModelData() {
        var cardOne = Card.builder().username("admin").number("ABC")
                .creationTime(LocalDateTime.of(2023, 5, 1, 12, 0)).build();
        var cardTwo = Card.builder().username("admin").number("DEF")
                .creationTime(LocalDateTime.of(2023, 5, 2, 13, 0)).build();
        var cardThree = Card.builder().username("admin").number("GHI")
                .creationTime(LocalDateTime.of(2023, 5, 3, 14, 0)).build();
        var cardFour = Card.builder().username("admin").number("JKL")
                .creationTime(LocalDateTime.of(2023, 5, 4, 15, 0)).build();
        return List.of(cardOne, cardTwo, cardThree, cardFour);
    }

    private List<CardResponse> dummyDtoData() {
        CardResponse response1 = CardResponse.builder()
                .creationTime("2023-05-1 12:00:00").build();
        CardResponse response2 = CardResponse.builder()
                .creationTime("2023-05-2 13:00:00").build();
        CardResponse response3 = CardResponse.builder()
                .creationTime("2023-05-3 14:00:00").build();
        CardResponse response4 = CardResponse.builder()
                .creationTime("2023-05-4 15:00:00").build();
        return List.of(response4, response3, response2, response1);
    }
}