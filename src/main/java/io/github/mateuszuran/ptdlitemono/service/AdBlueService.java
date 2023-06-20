package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdBlueService {
    private final CardService service;

    public void addAdBlue(AdBlueRequest request, Long cardId) {
        var card = service.checkIfCardExists(cardId);
        AdBlue adblue = AdBlue.builder()
                .adBlueDate(request.getDate())
                .adBlueLocalization(request.getLocalization())
                .adBlueAmount(request.getAmount())
                .build();
        card.getAdBlue().add(adblue);
        service.updateCard(card);
    }

    public void deleteAdBlue(Long cardId, Long blueId) {
        var card = service.checkIfCardExists(cardId);
        card.getAdBlue().removeIf(blue -> blueId.equals(blue.getId()));
        service.updateCard(card);
    }
}
