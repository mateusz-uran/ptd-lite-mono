package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.repository.AdBlueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdBlueService {
    private final CardService service;
    private final AdBlueRepository repository;

    public void addAdBlue(AdBlueRequest request, Long cardId) {
        var card = service.checkIfCardExists(cardId);
        AdBlue adblue = AdBlue.builder()
                .adBlueDate(request.getDate())
                .adBlueLocalization(request.getLocalization())
                .adBlueAmount(request.getAmount())
                .build();
        card.addBlue(adblue);
        repository.save(adblue);
    }

    public void deleteAdBlue(Long blueId) {
        repository.deleteById(blueId);
    }
}
