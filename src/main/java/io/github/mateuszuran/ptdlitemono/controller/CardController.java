package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.pdf.CardDetailsResponse;
import io.github.mateuszuran.ptdlitemono.dto.request.CardRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.CardResponse;
import io.github.mateuszuran.ptdlitemono.service.CardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
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

    @GetMapping("/last")
    public ResponseEntity<List<CardResponse>> getLastThreeCardsByMonth(@RequestParam String username) {
        return ResponseEntity.ok().body(service.getLastThreeCardsSortedDescByTime(username));
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
}
