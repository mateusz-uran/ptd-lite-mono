package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.exception.AdBlueEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.repository.AdBlueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdBlueService {
    private final CardService service;
    private final AdBlueRepository repository;
    private final FuelMapper fuelMapper;

    public void addAdBlue(AdBlueRequest request, Long cardId) {
        var card = service.checkIfCardExists(cardId);
        AdBlue adblue = AdBlue.builder()
                .adBlueDate(request.getAdBlueDate())
                .adBlueLocalization(request.getAdBlueLocalization())
                .adBlueAmount(request.getAdBlueAmount())
                .build();
        card.addBlue(adblue);
        repository.save(adblue);
    }

    public void deleteAdBlue(Long blueId) {
        repository.deleteById(blueId);
    }

    public List<AdBlueResponse> retrieveAdBlue(Long cardId) {
        var blue = repository.findAllAdBluesByCardId(cardId).orElseThrow(AdBlueEmptyException::new);
        if (blue.isEmpty()) {
            throw new AdBlueEmptyException();
        } else {
            return blue
                    .stream()
                    .map(fuelMapper::mapToAdBlueResponse)
                    .toList();
        }
    }

    public AdBlueResponse updateAdBlue(AdBlueRequest request, Long blueId) {
        var blue = repository.findById(blueId).orElseThrow(AdBlueEmptyException::new);
        fuelMapper.merge(request, blue);
        var updatedBlue =  repository.save(blue);
        return fuelMapper.mapToAdBlueResponse(updatedBlue);
    }
}
