package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.exception.CardNotFoundException;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardService {
    private final CardRepository repository;

    public Card checkIfCardExists(Long cardId) {
        return repository.findById(cardId).orElseThrow(CardNotFoundException::new);
    }
}
