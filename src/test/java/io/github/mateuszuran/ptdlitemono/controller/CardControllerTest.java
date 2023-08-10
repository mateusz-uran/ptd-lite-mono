package io.github.mateuszuran.ptdlitemono.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.mateuszuran.ptdlitemono.helpers.PTDModelHelpers;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import io.github.mateuszuran.ptdlitemono.repository.CardStatisticsRepository;
import io.github.mateuszuran.ptdlitemono.service.HourRateService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("it")
@AutoConfigureMockMvc
class CardControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private CardRepository repository;
    @Autowired
    private CardStatisticsRepository statisticsRepository;
    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private HourRateService hourRateService;

    private Card card;
    private PTDModelHelpers helpers;

    @BeforeEach
    void setUp() {
        card = Card.builder().username("john").number("ABC")
                .creationTime(LocalDateTime.of(2023, 5, 1, 12, 0)).build();
        helpers = new PTDModelHelpers();
    }

    @AfterEach
    void flush() {
        repository.deleteAll();
    }

    @WithMockUser(username = "admin")
    @Test
    void givenUsername_whenGet_thenReturnLastThreeCards() throws Exception {
        //given
        String username = "admin";
        var cards = helpers.createCardsModel();
        repository.saveAll(cards);
        //when + then
        mockMvc.perform(get("/api/card")
                        .param("username", username)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()", is(3)));

    }

    @WithMockUser(username = "admin")
    @Test
    void givenCardObjectAndDate_whenSave_thenStatus() throws Exception {
        mockMvc.perform(post("/api/card/addcard")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(card)))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @WithMockUser(username = "admin")
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

    @WithMockUser(username = "admin")
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

    @WithMockUser(username = "admin")
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


    @WithMockUser(username = "admin")
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

    @WithMockUser(username = "admin")
    @Test
    void givenUsernameAndDates_whenRetrieve_thenReturnMappedCardsList() throws Exception {
        //given
        String username = "admin";
        String firstDatePlainString = "2023-05-01 12:00:00";
        String secondDatePlainString = "2023-05-05 15:30:00";
        var cards = helpers.createCardsModel();
        repository.saveAll(cards);
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

    @WithMockUser(username = "john", authorities = {"read:rates"})
    @Test
    void givenUsername_whenRatesExists_thenReturnSelectedUserJsonRates() throws Exception {
        // given
        String username = "john";
        var jsonContent = helpers.expectedJsonValues()
                .getUsers()
                .stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst().orElseThrow();
        when(hourRateService.getUserHourRates(username))
                .thenReturn(jsonContent);

        // when + then
        mockMvc.perform(get("/api/card/rates")
                        .param("username", username)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.username").value(username));
    }

    @WithMockUser(username = "john")
    @Test
    void givenUsernameAndYear_whenStatisticExists_thenReturnListOfPerYear() throws Exception {
        //given
        String username = "john";
        int year = 2023;

        var fakeCardStats = helpers.createCardStatisticList(username, year);
        statisticsRepository.saveAllAndFlush(fakeCardStats);
        //when + then
        mockMvc.perform(get("/api/card/stat/year/{year}/{username}",year, username)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());

    }
}