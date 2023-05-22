package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.dto.FuelRequest;
import io.github.mateuszuran.ptdlitemono.service.AdBlueService;
import io.github.mateuszuran.ptdlitemono.service.FuelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fuel")
@RequiredArgsConstructor
public class FuelController {
    private final FuelService fuelService;
    private final AdBlueService adBlueService;

    @PostMapping
    public ResponseEntity<?> addFuel(@RequestBody FuelRequest fuelDto, @RequestParam Long id) {
        fuelService.addRefuelling(fuelDto, id);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/adblue")
    public ResponseEntity<?> addAdBlue(@RequestBody AdBlueRequest request, @RequestParam Long cardId) {
        adBlueService.addAdBlue(request, cardId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestParam Long id) {
        fuelService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/remove-blue")
    public ResponseEntity<?> deleteAdBlue(@RequestParam Long blueId, @RequestParam Long cardId) {
        adBlueService.deleteAdBlue(cardId, blueId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
