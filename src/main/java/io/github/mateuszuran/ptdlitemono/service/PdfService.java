package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.response.CardDetailsResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.service.logic.csv.UserPdfInformationSkeleton;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import io.github.mateuszuran.ptdlitemono.exception.UserNotFoundException;
import io.github.mateuszuran.ptdlitemono.service.logic.csv.CsvReader;
import io.github.mateuszuran.ptdlitemono.service.logic.pdf.pojo.Counters;
import io.github.mateuszuran.ptdlitemono.service.logic.pdf.pojo.PdfSource;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PdfService {
    private final CardService cardService;
    private final CsvReader csvReader;

    @Value("${pdf.csv.link}")
    private String csvLink;

    public UserPdfInformationSkeleton getUserInformation(String username) {
        return csvReader.readCsvFile(UserPdfInformationSkeleton.class, csvLink).stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst()
                .orElseThrow(UserNotFoundException::new);
    }

    public Counters calculateCounters(CardDetailsResponse response) {
        var firstTrip = response.getTrips().stream().mapToInt(TripResponse::getCounterStart).min();
        var lastTrip = response.getTrips().stream().mapToInt(TripResponse::getCounterEnd).max();
        var tripsMileage = response.getTrips().stream().mapToInt(TripResponse::getCarMileage).sum();
        var petrolSum = response.getFuels().stream().mapToInt(FuelResponse::getRefuelingAmount).sum();

        //when trips are empty
        int firstCounter = firstTrip.orElse(0);
        int lastCounter = lastTrip.orElse(0);

        return Counters.builder()
                .firstCounter(firstCounter)
                .lastCounter(lastCounter)
                .mileage(tripsMileage)
                .refuelingSum(petrolSum)
                .build();
    }

    public PdfSource collectAllInformationForPdf(String username, Long cardId) {
        var userInfo = getUserInformation(username);
        var cardInfo = cardService.getAllCardDataForPdf(cardId);
        var counters = calculateCounters(cardInfo);
        return PdfSource.builder()
                .userPdfSkeleton(userInfo)
                .counters(counters)
                .cardNumber(cardInfo.getCardNumber())
                .cardTripsList(cardInfo.getTrips())
                .cardFuelsList(cardInfo.getFuels())
                .cardAdBlueList(cardInfo.getBlue())
                .build();
    }
}
