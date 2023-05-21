package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.TripGroupRequest;
import io.github.mateuszuran.ptdlitemono.dto.TripGroupResponse;
import io.github.mateuszuran.ptdlitemono.service.TripGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/group")
public class TripGroupController {
    private final TripGroupService service;

    @PostMapping("/create")
    public ResponseEntity<TripGroupResponse> createGroupWithTrips(@RequestBody TripGroupRequest request) {
        return ResponseEntity.ok().body(service.createGroupTrips(request));
    }

    @GetMapping("/single")
    public ResponseEntity<TripGroupResponse> getGroup(@RequestParam Long groupId) {
        return ResponseEntity.ok().body(service.getGroup(groupId));
    }
}
