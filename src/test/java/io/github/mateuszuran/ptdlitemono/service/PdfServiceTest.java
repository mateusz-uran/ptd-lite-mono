package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.exception.UserNotFoundException;
import io.github.mateuszuran.ptdlitemono.service.logic.csv.CsvReader;
import io.github.mateuszuran.ptdlitemono.service.logic.csv.UserPdfInformationSkeleton;
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
    @Mock
    private CsvReader csvReader;

    @BeforeEach
    void setUp() {
        String testFilePath = getClass().getResource("/test.csv").getPath();
        service = new PdfService(cardService, csvReader);
        service.setCsvLink("file:" + testFilePath);
    }

    @Test
    void givenCsvFile_whenExists_thenReturnCsvData() {
        //given + when
        var result = csvReader.readCsvFile(UserPdfInformationSkeleton.class, null);
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