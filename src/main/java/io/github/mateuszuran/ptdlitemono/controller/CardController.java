package io.github.mateuszuran.ptdlitemono.controller;

import io.github.mateuszuran.ptdlitemono.dto.response.CardDetailsResponse;
import io.github.mateuszuran.ptdlitemono.dto.request.CardRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.CardResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.CardStatisticResponse;
import io.github.mateuszuran.ptdlitemono.service.CardStatisticService;
import io.github.mateuszuran.ptdlitemono.service.cronjob.Auth0AccessTokenProvider;
import io.github.mateuszuran.ptdlitemono.service.cronjob.StatisticCollector;
import io.github.mateuszuran.ptdlitemono.service.logic.json.pojo.UserRates;
import io.github.mateuszuran.ptdlitemono.service.CardService;
import io.github.mateuszuran.ptdlitemono.service.HourRateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/card")
public class CardController {
    private final CardService service;
    private final HourRateService hourRateService;

    private final CardStatisticService statisticsService;
    private final StatisticCollector updater;

    private final Auth0AccessTokenProvider provider;

    @GetMapping
    public ResponseEntity<List<CardResponse>> getLastThreeCardsByMonth(@RequestParam String username) {
        return ResponseEntity.ok().body(service.getLastThreeCardsSortedDescByTime(username));
    }

    @GetMapping("/details")
    public ResponseEntity<CardDetailsResponse> getCardDetails(@RequestParam Long id) {
        return ResponseEntity.ok()
                .body(service.getAllCardsAssociatedInformation(id));
    }

    @GetMapping("/archive")
    public ResponseEntity<List<CardResponse>> getAllCardsByDateBetween(@RequestParam String username, @RequestParam String firstDate, @RequestParam String secondDate) {
        return ResponseEntity.ok().body(service.retrieveCardsForArchive(username, firstDate, secondDate));
    }

    @GetMapping("/rates")
    public ResponseEntity<UserRates> getUserRates(@RequestParam String username) throws IOException {
        return ResponseEntity.ok().body(hourRateService.getUserHourRates(username));
    }

    @PostMapping("/addcard")
    public ResponseEntity<?> addNewCard(@RequestBody CardRequest cardRequest) {
        service.saveNewCard(cardRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<?> editCardNumber(@RequestParam Long cardId, @RequestBody String number) {
        return ResponseEntity.ok().body(service.editCardNumber(cardId, number));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCard(@RequestParam Long cardId) {
        service.deleteCard(cardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //statistics
    @GetMapping("/stat/{year}/{username}")
    public ResponseEntity<List<CardStatisticResponse>> getAllStatisticFromYear(@PathVariable int year, @PathVariable String username) {
        return ResponseEntity.ok().body(statisticsService.getAllStatisticByYearAndUsername(year, username));
    }

    @GetMapping("/stat/{year}/{month}/{username}")
    public ResponseEntity<CardStatisticResponse> getAllStatisticFromYearByMonth(
            @PathVariable int year,
            @PathVariable int month,
            @PathVariable String username) {
        return ResponseEntity.ok().body(statisticsService.getAllStatisticByYearAndMonthAndUsername(year, month, username));
    }

    //update stats testing method
    // TODO: 06.09.2023 remove and create cron job based on that
    @GetMapping("/stat/{username}")
    public ResponseEntity<?> updateStatistics(@PathVariable String username) {
        updater.statisticExecutor(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/stat/token")
    public ResponseEntity<?> callToken() throws IOException, InterruptedException {
        var result = provider.callAccessToken();
        log.info(result.body());
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
