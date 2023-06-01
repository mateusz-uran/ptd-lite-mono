package io.github.mateuszuran.ptdlitemono.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import io.github.mateuszuran.ptdlitemono.dto.pdf.PdfCsvReader;
import io.github.mateuszuran.ptdlitemono.exception.CardEmptyValuesException;
import io.github.mateuszuran.ptdlitemono.exception.CsvFileException;
import io.github.mateuszuran.ptdlitemono.exception.UserNotFoundException;
import io.github.mateuszuran.ptdlitemono.pdf.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PdfService {

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

    public Counters calculateCounters(PdfRequest pdfRequest) {
        var firstCounterFromCard = pdfRequest.getCardTripsList().stream().mapToInt(CardTrips::getCounterStart).min()
                .orElseThrow(CardEmptyValuesException::new);
        var lastCounterFromCard = pdfRequest.getCardTripsList().stream().mapToInt(CardTrips::getCounterEnd).max()
                .orElseThrow(CardEmptyValuesException::new);

        var sumMileage = pdfRequest.getCardTripsList().stream().mapToInt(CardTrips::getCarMileage).sum();

        var cardRefuelingAmount = pdfRequest.getCardFuelsList().stream().mapToInt(CardFuels::getRefuelingAmount).sum();

        return Counters.builder()
                .firstCounter(firstCounterFromCard)
                .lastCounter(lastCounterFromCard)
                .mileage(sumMileage)
                .refuelingSum(cardRefuelingAmount)
                .build();
    }

    public PdfTemplateSource gatherAllData(PdfRequest pdfRequest, String username) {
        var userInfo = getUserInformation(username);
        var counterInfo = calculateCounters(pdfRequest);
        return PdfTemplateSource.builder()
                .pdfCsvReader(userInfo)
                .counters(counterInfo)
                .cardNumber(pdfRequest.getNumber())
                .cardTripsList(pdfRequest.getCardTripsList())
                .cardFuelsList(pdfRequest.getCardFuelsList())
                .cardAdBlueList(pdfRequest.getCardAdBlueList())
                .build();
    }
}
