package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripGroupResponse;
import io.github.mateuszuran.ptdlitemono.dto.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripResponse;
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

    @PatchMapping("/addtogroup")
    public ResponseEntity<?> updateGroupWithNewTrips(@RequestParam Long groupId, @RequestBody List<Long> request) {
        groupService.addTripToGroup(request, groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/removefromgroup")
    public ResponseEntity<?> updateGroupRemoveTrips(@RequestParam Long groupId, @RequestBody List<Long> request) {
        groupService.removeTripFromGroup(request, groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deletegroup")
    public ResponseEntity<?> deleteTripGroup(@RequestParam Long groupId) {
        groupService.deleteTripGroup(groupId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/updategroup")
    public ResponseEntity<TripGroupResponse> updateGroupInformation(@RequestParam Long groupId, @RequestBody TripGroupRequest request) {
        return ResponseEntity.ok().body(groupService.editTripGroupInformation(groupId, request));
    }
}
