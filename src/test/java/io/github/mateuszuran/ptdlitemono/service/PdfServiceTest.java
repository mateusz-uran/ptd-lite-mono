package io.github.mateuszuran.ptdlitemono.service;

import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import io.github.mateuszuran.ptdlitemono.exception.UserNotFoundException;
import io.github.mateuszuran.ptdlitemono.service.logic.csv.CsvReader;
import io.github.mateuszuran.ptdlitemono.service.logic.csv.UserPdfInformationSkeleton;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

@Slf4j
@ExtendWith(MockitoExtension.class)
class PdfServiceTest {
    private PdfService service;
    @Mock
    private CardService cardService;
    @Mock
    private CsvReader csvReader;

    @Value("${pdf.csv.link}")
    private String csvLink;

    @BeforeEach
    void setUp() {
        service = new PdfService(cardService, csvReader);
    }

    void readCsvFile_ShouldParseCsvDataToList() {
        //given
        Class<UserPdfInformationSkeleton> clazz = UserPdfInformationSkeleton.class;
        String csvLink = "/test.csv";

        InputStream csvInputStream = getClass().getResourceAsStream(csvLink);
        InputStreamReader reader = new InputStreamReader(csvInputStream, StandardCharsets.UTF_8);

        ColumnPositionMappingStrategy<UserPdfInformationSkeleton> columnStrategy = new ColumnPositionMappingStrategy<>();
        columnStrategy.setType(clazz);
        columnStrategy.setColumnMapping("username", "truckModel", "truckType", "truckLicencePlate", "truckLeftTankFuelCapacity", "truckRightTankFuelCapacity", "truckFullTankCapacity", "truckAdBlueCapacity", "trailerType", "trailerLicensePlate", "trailerFuelCapacity", "truckImageLink", "truckImageDescription");

        CsvToBeanBuilder<UserPdfInformationSkeleton> csvToBeanBuilder = new CsvToBeanBuilder<UserPdfInformationSkeleton>(reader)
                .withType(clazz)
                .withSeparator(';')
                .withSkipLines(1)
                .withMappingStrategy(columnStrategy);

        CsvToBean<UserPdfInformationSkeleton> csvToBean = csvToBeanBuilder.build();

        List<UserPdfInformationSkeleton> result = csvToBean.parse();

        //then
        var csvData = expectedCsvValues();
        assertEquals(csvData, result);
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

    void givenAllCardInformationForPdf_whenCalculate_thenReturnCounters() {

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