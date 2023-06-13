package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.request.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.service.AdBlueService;
import io.github.mateuszuran.ptdlitemono.service.FuelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fuel")
@RequiredArgsConstructor
public class FuelController {
    private final FuelService fuelService;
    private final AdBlueService adBlueService;

    @PostMapping("/petrol/add")
    public ResponseEntity<?> addFuel(@RequestBody FuelRequest fuelDto, @RequestParam Long id) {
        fuelService.addRefuelling(fuelDto, id);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/blue/add")
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
    public ResponseEntity<?> deleteAdBlue(@RequestParam Long blueId) {
        adBlueService.deleteAdBlue(blueId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/petrol")
    public ResponseEntity<List<FuelResponse>> retrievePetrolList(@RequestParam Long cardId) {
        return ResponseEntity.ok().body(fuelService.retrieveFuels(cardId));
    }

    @GetMapping("/blue")
    public ResponseEntity<List<AdBlueResponse>> retrieveAdBlueList(@RequestParam Long cardId) {
        return ResponseEntity.ok().body(adBlueService.retrieveAdBlue(cardId));
    }
}
