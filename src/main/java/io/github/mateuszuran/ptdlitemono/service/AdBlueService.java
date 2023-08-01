package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.AdBlueResponse;
import io.github.mateuszuran.ptdlitemono.exception.AdBlueEmptyException;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.mapper.GenericMapper;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.repository.AdBlueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdBlueService {
    private final CardService service;
    private final AdBlueRepository repository;
    private final FuelMapper fuelMapper;
    private final GenericMapper genericMapper;

    public List<AdBlueResponse> getAllAdBlueFromCard(Long cardId) {
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

    public void addMultipleAdBlueObjects(List<AdBlueRequest> adBlue, Long cardId) {
        var card = service.checkIfCardExists(cardId);
        var adBlueToSave = adBlue.stream().map(singleAdBlue -> {
            var blue = genericMapper.mapToEntityModel(singleAdBlue, AdBlue.class);
            card.addBlue(blue);
            return blue;
        }).toList();
        repository.saveAll(adBlueToSave);
    }

    public AdBlueResponse updateSingleAdBlue(AdBlueRequest request, Long blueId) {
        var blue = repository.findById(blueId).orElseThrow(AdBlueEmptyException::new);
        genericMapper.mergeTwoDifferentObjects(request, blue);
        var updatedBlue =  repository.save(blue);
        return fuelMapper.mapToAdBlueResponse(updatedBlue);
    }

    public void deleteSingleAdBlue(Long blueId) {
        var blueToDelete = repository.findById(blueId).orElseThrow(AdBlueEmptyException::new);
        repository.delete(blueToDelete);
    }
}
