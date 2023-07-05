package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripResponse;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import io.github.mateuszuran.ptdlitemono.service.TripGroupService;
import io.github.mateuszuran.ptdlitemono.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/trip")
public class TripController {
    private final TripService service;
    private final TripGroupService groupService;

    @PostMapping
    public ResponseEntity<?> addTripsList(@RequestBody List<TripRequest> trips, @RequestParam Long cardId) {
        service.addManyTips(trips, cardId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTrips(@RequestBody List<TripRequest> trips, @RequestParam Long cardId) {
        service.addTips(trips, cardId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAll(@RequestBody List<Long> selectedTripId) {
        service.deleteSelected(selectedTripId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<TripResponse>> getTrips(@RequestParam Long cardId) {
        return ResponseEntity.ok().body(service.retrieveTripsFromCard(cardId));
    }

    @PatchMapping("/update")
    public ResponseEntity<TripResponse> updateTrip(@RequestParam Long tripId, @RequestBody TripRequest request) {
        return ResponseEntity.ok().body(service.editTrip(tripId, request));
    }

    @PostMapping("/addgroup")
    public ResponseEntity<?> createGroup(@RequestBody TripGroupRequest request) {
        groupService.createGroup(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/getgroup")
    public ResponseEntity<TripGroup> getGroup(@RequestParam Long groupId) {
        return ResponseEntity.ok().body(groupService.getGroup(groupId));
    }

    @GetMapping("/singletrip")
    public ResponseEntity<?> getSingleTrip(@RequestParam Long tripId) {
        return ResponseEntity.ok().body(service.getSingleTrip(tripId));
    }

    @PatchMapping("/addtogrup")
    public ResponseEntity<?> updateGroup(@RequestParam Long groupId, @RequestBody TripGroupRequest request) {
        groupService.addTripToGroup(request, groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
