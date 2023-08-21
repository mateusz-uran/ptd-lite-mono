package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.request.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.dto.request.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.TripGroupResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
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

    @GetMapping
    public ResponseEntity<List<TripResponse>> getAllTripsFromCard(@RequestParam Long cardId) {
        return ResponseEntity.ok().body(service.getAllTripsFromCard(cardId));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addListOfTripsToCard(@RequestBody List<TripRequest> trips, @RequestParam Long cardId) {
        service.addManyTrips(trips, cardId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/addgroup")
    public ResponseEntity<?> createTripGroup(@RequestBody TripGroupRequest request) {
        groupService.createGroup(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/update")
    public ResponseEntity<TripResponse> updateSingleTrip(@RequestParam Long tripId, @RequestBody TripRequest request) {
        return ResponseEntity.ok().body(service.editSingleTrip(tripId, request));
    }

    @PatchMapping("/updategroup")
    public ResponseEntity<TripGroupResponse> updateTripGroupInformation(@RequestParam Long groupId, @RequestBody TripGroupRequest group) {
        return ResponseEntity.ok().body(groupService.editTripGroupInformation(groupId, group));
    }

    @PatchMapping("/addtogroup")
    public ResponseEntity<?> addExistingTripsToTripGroup(@RequestParam Long groupId, @RequestBody List<Long> request) {
        groupService.addTripToGroup(request, groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/removefromgroup")
    public ResponseEntity<?> removeExistingTripsFromGroup(@RequestParam Long groupId, @RequestBody List<Long> request) {
        groupService.removeTripFromGroup(request, groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteSelectedTrips(@RequestParam String username, @RequestBody List<Long> selectedTripId) {
        service.deleteSelectedTrips(selectedTripId, username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/deletegroup")
    public ResponseEntity<?> deleteTripGroup(@RequestParam Long groupId) {
        groupService.deleteTripGroup(groupId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
