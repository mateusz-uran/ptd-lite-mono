package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripResponse;
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

    @PostMapping
    public ResponseEntity<?> addTripsList(@RequestBody List<TripRequest> trips, @RequestParam Long cardId) {
        service.addManyTips(trips, cardId);
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
}
