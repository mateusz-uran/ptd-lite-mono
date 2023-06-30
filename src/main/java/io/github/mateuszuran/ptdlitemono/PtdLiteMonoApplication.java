package io.github.mateuszuran.ptdlitemono;

import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class PtdLiteMonoApplication implements CommandLineRunner {
    private final CardRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(PtdLiteMonoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        loadTestData();
    }

    private void loadTestData() {
        // Create and save entities
        String username = "test123";
        Card card1 = Card.builder().number(username).username(username).creationTime(LocalDateTime.now()).build();
        Card card2 = Card.builder().number(username).username(username).creationTime(LocalDateTime.of(2023, 6, 30, 12, 0)).build();
        Card card3 = Card.builder().number(username).username(username).creationTime(LocalDateTime.of(2023, 6, 25, 16, 35)).build();
        Card card4 = Card.builder().number(username).username(username).creationTime(LocalDateTime.of(2023, 6, 15, 8, 59)).build();
        Card card5 = Card.builder().number(username).username(username).creationTime(LocalDateTime.of(2023, 4, 3, 21, 59)).build();
        Card card6 = Card.builder().number(username).username(username).creationTime(LocalDateTime.of(2023, 4, 19, 13, 17)).build();
        Card card7 = Card.builder().number(username).username(username).creationTime(LocalDateTime.of(2022, 10, 8, 18, 48)).build();
        Card card8 = Card.builder().number(username).username(username).creationTime(LocalDateTime.of(2022, 12, 23, 9, 15)).build();
        Card card9 = Card.builder().number(username).username(username).creationTime(LocalDateTime.of(2022, 7, 11, 15, 39)).build();
        // Additional data loading logic if needed
    }
}
