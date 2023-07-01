package io.github.mateuszuran.ptdlitemono;

import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class PtdLiteMonoApplication {
    private final CardRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(PtdLiteMonoApplication.class, args);
    }
}
