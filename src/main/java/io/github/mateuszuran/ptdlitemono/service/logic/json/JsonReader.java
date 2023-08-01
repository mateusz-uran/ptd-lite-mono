package io.github.mateuszuran.ptdlitemono.service.logic.json;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Slf4j
@Configuration
public class JsonReader {

    public <T> T readJsonFile(Class<T> clazz, String jsonLink) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            URL url = new URL(jsonLink);
            InputStreamReader reader = new InputStreamReader(url.openStream(), StandardCharsets.UTF_8);
            return objectMapper.readValue(reader, clazz);
        } catch (IOException e) {
            e.printStackTrace();
            throw new IOException("Failed to retrieve JSON data: " + e.getMessage(), e);
        }
    }
}
