package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.TripGroupDto;
import io.github.mateuszuran.ptdlitemono.service.TripGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/group")
public class TripGroupController {
    private final TripGroupService service;

    @PostMapping
    public ResponseEntity<?> createGroup(@RequestBody TripGroupDto request) {
        return ResponseEntity.ok().body(service.createGroup(request));
    }

    @GetMapping
    public ResponseEntity<?> getGroup(@RequestParam String cargo) {
        return ResponseEntity.ok().body(service.getGroup(cargo));
    }
}
