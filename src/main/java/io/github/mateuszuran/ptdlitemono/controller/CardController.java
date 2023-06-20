package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.*;
import io.github.mateuszuran.ptdlitemono.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/card")
public class CardController {
    private final CardService service;

    @GetMapping("/all")
    public ResponseEntity<List<CardResponse>> getCardsByMonth(
            @RequestParam String username, @RequestParam int year, @RequestParam int month) {
        return ResponseEntity.ok().body(service.getCardsSorted(username, year, month));
    }

    @PostMapping("/add")
    public ResponseEntity<?> saveCard(@RequestBody CardRequest cardRequest, @RequestParam int year, @RequestParam int month, @RequestParam int dayOfMonth) {
        return ResponseEntity.ok().body(service.saveCard(cardRequest, year, month, dayOfMonth));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam Long cardId) {
        service.deleteCard(cardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/details")
    public ResponseEntity<CardDetailsResponse> getCardDetails(@RequestParam Long id) {
        return ResponseEntity.ok()
                .body(service.getCardDetails(id));
    }

    @GetMapping
    public ResponseEntity<List<CardResponse>> getLastThreeCardsByMonth(@RequestParam String username) {
        return ResponseEntity.ok().body(service.getLastThreeCardsSortedDescByTime(username));
    }

    @PostMapping("/addcard")
    public ResponseEntity<?> saveNewCard(@RequestBody CardRequest cardRequest) {
        service.saveNewCard(cardRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<?> editCardNumber(@RequestParam Long cardId, @RequestBody String number) {
        return ResponseEntity.ok().body(service.editCard(cardId, number));
    }

    @DeleteMapping("/deletecard")
    public ResponseEntity<?> deleteCard(@RequestParam Long cardId) {
        service.deleteCard(cardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
