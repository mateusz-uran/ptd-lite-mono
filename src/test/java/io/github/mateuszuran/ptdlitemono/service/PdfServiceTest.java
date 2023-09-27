package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.exception.UserNotFoundException;
import io.github.mateuszuran.ptdlitemono.helpers.PTDModelHelpers;
import io.github.mateuszuran.ptdlitemono.service.logic.csv.CsvReader;
import io.github.mateuszuran.ptdlitemono.service.logic.csv.UserPdfInformationSkeleton;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@Slf4j
@ExtendWith(MockitoExtension.class)
class PdfServiceTest {
    private PdfService service;
    @Mock
    private CardService cardService;
    @Mock
    private CsvReader csvReader;
    private PTDModelHelpers helpers;

    @Value("${pdf.csv.link}")
    private String csvLink;

    @BeforeEach
    void setUp() {
        service = new PdfService(cardService, csvReader);
        helpers = new PTDModelHelpers();
    }

    @Test
    void givenUsername_whenReadCsvFile_thenReturnUserInformation() {
        //given
        String username = "john";
        var userCsvInfo = expectedCsvValues()
                .stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst().orElseThrow();
        when(csvReader.readCsvFile(UserPdfInformationSkeleton.class, csvLink)).thenReturn(expectedCsvValues());
        //when
        var expectedUserInfo = service.getUserInformation(username);
        //then
        assertEquals(userCsvInfo, expectedUserInfo);
    }

    @Test
    void givenUsername_whenNotExists_thenThrowException() {
        assertThatThrownBy(() -> service.getUserInformation("foo"))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessageContaining("User not found in csv file, please contact admin.");
    }

    @Test
    void givenAllCardInformationForPdf_whenCalculate_thenReturnCounters() {
        //given
        var readyCardForPdf = helpers.cardDtoResponseForPdf();
        //when
        var result = service.calculateCounters(readyCardForPdf);
        //then
        assertEquals(result, helpers.readyCountersForPdf());
    }

    @Test
    void givenUsernameAndCardId_whenCollect_thenReturnReadyPdfSource() {
        //given
        String username = "john";
        Long cardId = 123L;

        var userCsvInfo = expectedCsvValues()
                .stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst().orElseThrow();
        when(csvReader.readCsvFile(UserPdfInformationSkeleton.class, csvLink)).thenReturn(expectedCsvValues());

        var readyCardDtoResponseModel = helpers.cardDtoResponseForPdf();
        when(cardService.getAllCardDataForPdf(cardId)).thenReturn(readyCardDtoResponseModel);

        var expectedResult = helpers.skeletonForPdf(userCsvInfo);
        //when
        var result = service.collectAllInformationForPdf(username, cardId);
        //then
        assertEquals(expectedResult.getUserPdfSkeleton(), result.getUserPdfSkeleton());
        assertEquals(expectedResult.getCounters(), result.getCounters());
        assertEquals(expectedResult.getCardNumber(), result.getCardNumber());
        assertEquals(expectedResult.getCardTripsList(), result.getCardTripsList());
        assertEquals(expectedResult.getCardAdBlueList(), result.getCardAdBlueList());
        assertEquals(expectedResult.getCardFuelsList().get(0).getVehicleCounter(), result.getCardFuelsList().get(0).getVehicleCounter());
    }

    private List<UserPdfInformationSkeleton> expectedCsvValues() {
        UserPdfInformationSkeleton pdfCsvReader1 = new UserPdfInformationSkeleton(
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
                "ceoLink1",
                "doe");
        UserPdfInformationSkeleton pdfCsvReader2 = new UserPdfInformationSkeleton(
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
                "ceoLink2",
                "smith");
        return List.of(pdfCsvReader1, pdfCsvReader2);
    }
}