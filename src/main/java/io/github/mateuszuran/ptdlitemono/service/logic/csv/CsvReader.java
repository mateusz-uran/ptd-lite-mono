package io.github.mateuszuran.ptdlitemono.service.logic.csv;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import io.github.mateuszuran.ptdlitemono.exception.CsvFileException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class CsvReader {

    public <T> List<T> readCsvFile(Class<T> clazz, String csvLink) {
        HeaderColumnNameMappingStrategy<T> mappingStrategy = new HeaderColumnNameMappingStrategy<>();
        mappingStrategy.setType(clazz);
        try {
            URL url = new URL(csvLink);
            InputStreamReader reader = new InputStreamReader(url.openStream(), StandardCharsets.UTF_8);
            CsvToBean<T> csvToBean = new CsvToBeanBuilder<T>(reader)
                    .withType(clazz)
                    .withSeparator(';')
                    .withSkipLines(1)
                    .build();
            return csvToBean.stream().collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
            throw new CsvFileException();
        }
    }
}
