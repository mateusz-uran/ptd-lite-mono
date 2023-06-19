package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.pdf.CardDetailsResponse;
import io.github.mateuszuran.ptdlitemono.pdf.PdfCsvReader;
import io.github.mateuszuran.ptdlitemono.dto.response.FuelResponse;
import io.github.mateuszuran.ptdlitemono.dto.response.TripResponse;
import io.github.mateuszuran.ptdlitemono.exception.CardEmptyValuesException;
import io.github.mateuszuran.ptdlitemono.exception.UserNotFoundException;
import io.github.mateuszuran.ptdlitemono.pdf.Counters;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@Slf4j
@ExtendWith(MockitoExtension.class)
class PdfServiceTest {
    private PdfService service;
    @Mock
    private CardService cardService;

    @BeforeEach
    void setUp() {
        String testFilePath = getClass().getResource("/test.csv").getPath();
        service = new PdfService(cardService);
        service.setCsvLink("file:" + testFilePath);
    }

    @Test
    void givenCsvFile_whenExists_thenReturnCsvData() {
        //given + when
        var result = service.getCsvFileWithData();
        //then
        assertThat(result).isEqualTo(expectedCsvValues());
    }

    @Test
    void givenUsername_whenExists_thenReturnCsvObject() {
        //given + when
        var result = service.getUserInformation("will");
        //then
        assertThat(result).isEqualTo(expectedCsvValues().get(1));
    }

    @Test
    void givenUsername_whenNotExists_thenThrowException() {
        assertThatThrownBy(() -> service.getUserInformation("foo"))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessageContaining("User not found in csv file, please contact admin.");
    }

    @Test
    void givenCardInformation_whenCalculate_thenReturnReadyCounter() {
        //given
        var cardInfo = dataForPdf();
        //when
        var calculatedCounters = service.calculateCounters(cardInfo);
        //then
        assertThat(calculatedCounters.getFirstCounter()).isEqualTo(200);
        assertThat(calculatedCounters.getLastCounter()).isEqualTo(500);
        assertThat(calculatedCounters.getMileage()).isEqualTo(300);
        assertThat(calculatedCounters.getRefuelingSum()).isEqualTo(120);
    }

    @Test
    void givenCardInformation_whenTripEmpty_thenThrowException() {
        //given
        var cardInfo = dataForPdf();
        cardInfo.setTrips(List.of());
        //when + then
        assertThatThrownBy(() -> service.calculateCounters(cardInfo))
                .isInstanceOf(CardEmptyValuesException.class)
                .hasMessageContaining("Card's trips cannot be empty");
    }

    @Test
    void givenCardInformationAndUsername_whenRetrieveData_thenReturnReadyPdfInformation() {
        //given
        String username = "will";
        var cardInfo = dataForPdf();
        Counters counters = Counters.builder()
                .firstCounter(200)
                .lastCounter(500)
                .mileage(300)
                .refuelingSum(120)
                .build();
        //when
        var readyPdfInfo = service.retrieveInformation(username, 123L);
        //then
        assertThat(readyPdfInfo.getPdfCsvReader().getUsername()).isEqualTo(username);
        assertThat(readyPdfInfo.getCardNumber()).isEqualTo(dataForPdf().getCardNumber());
        assertThat(readyPdfInfo.getCardTripsList()).isEqualTo(dataForPdf().getTrips());
        assertThat(readyPdfInfo.getCardFuelsList()).isEqualTo(dataForPdf().getFuels());
        assertThat(readyPdfInfo.getCounters()).isEqualTo(counters);
    }

    private CardDetailsResponse dataForPdf() {
        TripResponse trip1 = TripResponse.builder()
                .counterStart(200)
                .counterEnd(300)
                .carMileage(100)
                .build();
        TripResponse trip2 = TripResponse.builder()
                .counterStart(300)
                .counterEnd(400)
                .carMileage(100)
                .build();
        TripResponse trip3 = TripResponse.builder()
                .counterStart(400)
                .counterEnd(500)
                .carMileage(100)
                .build();

        FuelResponse fuel1 = FuelResponse.builder()
                .vehicleCounter(200)
                .refuelingAmount(50)
                .build();
        FuelResponse fuel2 = FuelResponse.builder()
                .vehicleCounter(360)
                .refuelingAmount(70)
                .build();

        return CardDetailsResponse.builder()
                .cardNumber("ABC")
                .trips(List.of(trip1, trip2, trip3))
                .fuels(List.of(fuel1, fuel2))
                .build();
    }

    private List<PdfCsvReader> expectedCsvValues() {
        PdfCsvReader pdfCsvReader1 = new PdfCsvReader(
                "john",
                "test",
                "ab-123",
                "lop123",
                "100",
                "200",
                "300",
                "40",
                "fridge",
                "lop321",
                "100",
                "link",
                "test1/test2",
                "linkCeo",
                "doe");
        PdfCsvReader pdfCsvReader2 = new PdfCsvReader(
                "will",
                "test2",
                "zx-987",
                "lop987",
                "200",
                "300",
                "400",
                "50",
                "lorry",
                "lop789",
                "200",
                "link2",
                "test3/test4",
                "linkeCeo2",
                "smith");
        return List.of(pdfCsvReader1, pdfCsvReader2);
    }
}