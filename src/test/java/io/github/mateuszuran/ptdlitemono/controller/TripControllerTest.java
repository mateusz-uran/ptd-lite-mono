package io.github.mateuszuran.ptdlitemono.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.mateuszuran.ptdlitemono.dto.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripRequest;
import io.github.mateuszuran.ptdlitemono.exception.TripGroupNotFoundException;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Trip;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import io.github.mateuszuran.ptdlitemono.repository.TripGroupRepository;
import io.github.mateuszuran.ptdlitemono.repository.TripRepository;
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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser(value = "user123")
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
    @Autowired
    private TripGroupRepository groupRepository;
    private Card card;

    @AfterEach
    void flush() {
        repository.deleteAll();
    }

    @BeforeEach
    void setUp() {
        card = Card.builder().username("user123").number("ABC")
                .creationTime(LocalDateTime.of(2023, 5, 1, 12, 0)).build();
        cardRepository.save(card);
    }

    @Test
    void givenCardIdAndTripList_whenPost_thenReturnStatus() throws Exception {
        //given
        Trip trip1 = Trip.builder().counterStart(200).counterEnd(300).build();
        Trip trip2 = Trip.builder().counterStart(300).counterEnd(400).build();
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
        Trip trip1 = Trip.builder().counterStart(200).counterEnd(300).build();
        Trip trip2 = Trip.builder().counterStart(300).counterEnd(400).build();
        repository.saveAllAndFlush(List.of(trip1, trip2));
        //when + then
        mockMvc.perform(delete("/api/trip")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(List.of(trip1.getId(), trip2.getId()))))
                .andExpect(status().isNoContent())
                .andDo(print());
    }

    @Test
    void givenCardId_whenGet_thenReturnMappedList() throws Exception {
        //given
        Trip trip1 = Trip.builder().counterStart(200).counterEnd(300).card(card).build();
        Trip trip2 = Trip.builder().counterStart(300).counterEnd(400).card(card).build();
        repository.saveAll(List.of(trip1, trip2));
        //when
        mockMvc.perform(get("/api/trip")
                        .param("cardId", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()", is(2)));
    }

    @Test
    void givenCardId_whenNoData_thenThrowException() throws Exception {
        mockMvc.perform(get("/api/trip")
                        .param("cardId", String.valueOf(card.getId()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Trips data is empty"));
    }

    @Test
    void givenTripIdAndObject_whenUpdate_thenReturnMappedObject() throws Exception {
        //given
        Trip tripToUpdate = Trip.builder()
                .counterStart(455)
                .counterEnd(999)
                .build();
        repository.saveAndFlush(tripToUpdate);
        TripRequest request = TripRequest.builder()
                .counterStart(300)
                .build();
        //when + then
        mockMvc.perform(patch("/api/trip/update")
                        .param("tripId", String.valueOf(tripToUpdate.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.counterStart").value(300));
    }

    @Test
    void givenTripIdAndObject_whenTripNotFound_thenReturnErrorMessage() throws Exception {
        //given
        TripRequest request = TripRequest.builder()
                .counterStart(300)
                .build();
        //when + then
        mockMvc.perform(patch("/api/trip/update")
                        .param("tripId", String.valueOf(123L))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Trips data is empty"));
    }

    @Test
    void givenTripIds_whenCreateGroup_thenReturnStatusCreated() throws Exception {
        //given
        TripGroupRequest request = TripGroupRequest.builder().tripIds(Arrays.asList(1L, 2L)).build();
        //when + then
        mockMvc.perform(post("/api/trip/addgroup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    void givenTripsIds_whenAddTripsToGroup_thenReturnStatusIsOk() throws Exception {
        //given
        Trip trip1 = Trip.builder().id(1L).build();
        Trip trip2 = Trip.builder().id(2L).build();
        repository.saveAll(List.of(trip1, trip2));
        Long groupId = 1L;
        TripGroup existingGroup = TripGroup.builder()
                .id(groupId)
                .trips(new ArrayList<>(Arrays.asList(trip1, trip2)))
                .build();
        groupRepository.save(existingGroup);
        //when + then
        mockMvc.perform(patch("/api/trip/addtogroup")
                        .param("groupId", String.valueOf(groupId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(Arrays.asList(1L, 2L))))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void givenTripsIds_whenAddTripsToNotExistingGroup_thenReturnErrorMessage() throws Exception {
        //given
        Trip trip1 = Trip.builder().id(1L).build();
        Trip trip2 = Trip.builder().id(2L).build();
        repository.saveAll(List.of(trip1, trip2));
        groupRepository.deleteAll();
        Long groupId = 1L;
        //when + then
        mockMvc.perform(patch("/api/trip/addtogroup")
                        .param("groupId", String.valueOf(groupId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(Arrays.asList(1L, 2L))))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Group not found"));
    }

    @Test
    void givenTripsIds_whenRemoveTripsFromGroup_thenReturnStatusIsOk() throws Exception {
        //given
        Trip trip1 = Trip.builder().id(1L).build();
        Trip trip2 = Trip.builder().id(2L).build();
        repository.saveAll(List.of(trip1, trip2));
        Long groupId = 1L;
        TripGroup existingGroup = TripGroup.builder()
                .id(groupId)
                .trips(new ArrayList<>(Arrays.asList(trip1, trip2)))
                .build();
        groupRepository.save(existingGroup);
        //when + then
        mockMvc.perform(patch("/api/trip/removefromgroup")
                        .param("groupId", String.valueOf(groupId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(Arrays.asList(1L, 2L))))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void givenTripsIds_whenRemoveTripsFromNotExistingGroup_thenReturnErrorMessage() throws Exception {
        //given
        Trip trip1 = Trip.builder().id(1L).build();
        Trip trip2 = Trip.builder().id(2L).build();
        repository.saveAll(List.of(trip1, trip2));
        Long groupId = 1L;
        //when + then
        mockMvc.perform(patch("/api/trip/removefromgroup")
                        .param("groupId", String.valueOf(groupId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(Arrays.asList(1L, 2L))))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Group not found"));
    }

    @Test
    void givenTripId_whenDelete_thenReturnNoContent() throws Exception {
        //given
        TripGroup group = TripGroup.builder().build();
        groupRepository.saveAndFlush(group);

        //when + then
        mockMvc.perform(delete("/api/trip/deletegroup")
                        .param("groupId", String.valueOf(group.getId()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andDo(print());
        assertFalse(groupRepository.existsById(group.getId()));
    }

    @Test
    void givenTripId_whenDelete_thenThrowException() throws Exception {
        //given
        Long groupId = 123L;
        //when + then
        mockMvc.perform(delete("/api/trip/deletegroup")
                        .param("groupId", String.valueOf(groupId))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Group not found"));
    }

    @Test
    void givenGroupId_whenUpdate_thenReturnUpdatedObject() throws Exception {
        //given
        TripGroup group = TripGroup.builder().cargoName("chicken").build();
        groupRepository.saveAndFlush(group);
        TripGroupRequest request = TripGroupRequest.builder().cargoName("food").build();
        //when + then
        mockMvc.perform(patch("/api/trip/updategroup")
                        .param("groupId", String.valueOf(group.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.cargoName").value("food"));
    }

    @Test
    void givenGroupId_whenNotExists_thenThrowException() throws Exception {
        //given
        Long groupId = 123L;
        TripGroupRequest request = TripGroupRequest.builder().cargoName("food").build();
        //when + then
        mockMvc.perform(patch("/api/trip/updategroup")
                        .param("groupId", String.valueOf(groupId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andDo(print())
                .andExpect(jsonPath("$.description").value("Group not found"));
    }
}