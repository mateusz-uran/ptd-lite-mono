package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.request.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.dto.request.FuelRequest;
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

    @GetMapping("/petrol")
    public ResponseEntity<List<FuelResponse>> getAllFuelsFromCard(@RequestParam Long cardId) {
        return ResponseEntity.ok().body(fuelService.getAllFuelsFromCard(cardId));
    }

    @GetMapping("/blue")
    public ResponseEntity<List<AdBlueResponse>> getAllAdBlueFromCard(@RequestParam Long cardId) {
        return ResponseEntity.ok().body(adBlueService.getAllAdBlueFromCard(cardId));
    }

    @PostMapping("/petrol/addmultiple")
    public ResponseEntity<?> addManyFuels(@RequestBody List<FuelRequest> fuelDto, @RequestParam Long cardId) {
        fuelService.addMultipleFuels(fuelDto, cardId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/blue/addmultiple")
    public ResponseEntity<?> addManyAdBlue(@RequestBody List<AdBlueRequest> request, @RequestParam Long cardId) {
        adBlueService.addMultipleAdBlueObjects(request, cardId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/petrol/update")
    public ResponseEntity<FuelResponse> updateSingleFuel(@RequestBody FuelRequest request, @RequestParam Long fuelId) {
        return ResponseEntity.ok().body(fuelService.updateSingleFuel(request, fuelId));
    }

    @PatchMapping("/blue/update")
    public ResponseEntity<AdBlueResponse> updateSingleAdBlue(@RequestBody AdBlueRequest request, @RequestParam Long blueId) {
        return ResponseEntity.ok().body(adBlueService.updateSingleAdBlue(request, blueId));
    }

    @DeleteMapping("/petrol/delete")
    public ResponseEntity<?> deletePetrol(@RequestParam Long fuelId) {
        fuelService.deleteFuel(fuelId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/blue/delete")
    public ResponseEntity<?> deleteAdBlue(@RequestParam Long blueId) {
        adBlueService.deleteSingleAdBlue(blueId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
