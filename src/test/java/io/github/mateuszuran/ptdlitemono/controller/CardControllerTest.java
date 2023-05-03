package io.github.mateuszuran.ptdlitemono.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
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

import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


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

    @AfterEach
    void flush() {
        repository.deleteAll();
    }

    @BeforeEach
    void setUp() {
        card = Card.builder().username("admin").number("ABC")
                .creationTime(LocalDateTime.of(2023, 5, 1, 12, 0)).build();
    }

    @Test
    void givenUsernameAndDate_whenFindCards_thenReturnList() throws Exception {
        //given
        Card card2 = Card.builder().username("admin").number("XYZ")
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
                        .param("cardId", String.valueOf(1L))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Card not found."));
    }
}