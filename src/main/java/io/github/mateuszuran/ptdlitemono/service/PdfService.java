package io.github.mateuszuran.ptdlitemono.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import io.github.mateuszuran.ptdlitemono.pdf.CardDetailsResponse;
import io.github.mateuszuran.ptdlitemono.pdf.PdfCsvReader;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import io.github.mateuszuran.ptdlitemono.exception.CardEmptyValuesException;
import io.github.mateuszuran.ptdlitemono.exception.CsvFileException;
import io.github.mateuszuran.ptdlitemono.exception.UserNotFoundException;
import io.github.mateuszuran.ptdlitemono.pdf.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PdfService {
    private final CardService cardService;

    @Value("${pdf.csv.link}")
    private String csvLink;

    public void setCsvLink(String csvLink) {
        this.csvLink = csvLink;
    }

    public List<PdfCsvReader> getCsvFileWithData() {
        try {
            URL url = new URL(csvLink);
            InputStreamReader reader = new InputStreamReader(url.openStream(), StandardCharsets.UTF_8);
            CsvToBean<PdfCsvReader> csvToBean = new CsvToBeanBuilder<PdfCsvReader>(reader)
                    .withType(PdfCsvReader.class)
                    .withSeparator(';')
                    .withSkipLines(1)
                    .build();
            return csvToBean.stream().collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
            throw new CsvFileException();
        }
    }

    public PdfCsvReader getUserInformation(String username) {
        return getCsvFileWithData().stream()
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

    public PdfSource retrieveInformation(String username, Long cardId) {
        var userInfo = getUserInformation(username);
        var cardInfo = cardService.getCardDetails(cardId);
        var counters = calculateCounters(cardInfo);
        return PdfSource.builder()
                .pdfCsvReader(userInfo)
                .counters(counters)
                .cardNumber(cardInfo.getCardNumber())
                .cardTripsList(cardInfo.getTrips())
                .cardFuelsList(cardInfo.getFuels())
                .cardAdBlueList(cardInfo.getBlue())
                .build();
    }
}
