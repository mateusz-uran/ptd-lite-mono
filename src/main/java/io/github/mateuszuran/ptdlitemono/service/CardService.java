package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.request.CardRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.*;
import io.github.mateuszuran.ptdlitemono.exception.CardEmptyException;
import io.github.mateuszuran.ptdlitemono.exception.CardExistsException;
import io.github.mateuszuran.ptdlitemono.exception.CardNotFoundException;
import io.github.mateuszuran.ptdlitemono.mapper.CardMapper;
import io.github.mateuszuran.ptdlitemono.mapper.FuelMapper;
import io.github.mateuszuran.ptdlitemono.mapper.TripMapper;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardService {
    private final CardRepository repository;
    private final CardMapper cardMapper;
    private final FuelMapper fuelMapper;
    private final TripMapper tripMapper;

    public Card checkIfCardExists(Long cardId) {
        return repository.findById(cardId).orElseThrow(CardNotFoundException::new);
    }

    public CardDetailsResponse getAllCardsAssociatedInformation(Long id) {
        Card card = repository.findById(id).orElseThrow(CardNotFoundException::new);

        List<FuelResponse> fuels = card.getFuels().stream()
                .map(fuelMapper::mapToFuelResponse)
                .sorted(Comparator.comparing(FuelResponse::getVehicleCounter))
                .collect(Collectors.toList());

        List<TripResponse> trips = card.getTrips().stream()
                .map(tripMapper::mapToTripResponse)
                .sorted(Comparator.comparing(TripResponse::getCounterEnd))
                .collect(Collectors.toList());

        List<AdBlueResponse> blue = card.getAdBlue().stream()
                .map(fuelMapper::mapToAdBlueResponse)
                .toList();
        return new CardDetailsResponse(null, trips, fuels, blue);
    }

    public void saveNewCard(CardRequest cardRequest) {
        if (cardRequest.getNumber().isEmpty() || cardRequest.getNumber().trim().isEmpty()) {
            throw new CardEmptyException();
        }

        if (repository.existsByNumberIgnoreCaseAndUsername(cardRequest.getNumber(), cardRequest.getUsername())) {
            throw new CardExistsException(cardRequest.getNumber());
        }

        var now = LocalDateTime.now();
        var card = Card.builder()
                .number(cardRequest.getNumber().toUpperCase())
                .username(cardRequest.getUsername())
                .creationTime(now)
                .build();
        repository.save(card);
    }

    public CardResponse editCardNumber(Long cardId, String number) {
        var cardToBeEdited = checkIfCardExists(cardId);
        cardToBeEdited.setNumber(number);
        var editedCard = repository.save(cardToBeEdited);
        return cardMapper.mapToCardResponseWithFormattedCreationTime(editedCard);
    }

    public List<CardResponse> getLastThreeCardsSortedDescByTime(String username) {
        return repository.findLastThreeEntitiesByUsernameAndOrderByCreationTime(username)
                .stream()
                .map(cardMapper::mapToCardResponseWithFormattedCreationTime)
                .toList();
    }

    public CardDetailsResponse getAllCardDataForPdf(Long cardId) {
        Card card = repository.findById(cardId).orElseThrow(CardNotFoundException::new);

        List<TripResponse> trips = card.getTrips().stream()
                .map(tripMapper::mapToTripResponse)
                .sorted(Comparator.comparing(TripResponse::getCounterEnd))
                .collect(Collectors.toList());

        List<FuelResponse> fuels = card.getFuels().stream()
                .map(fuelMapper::mapToFuelResponse)
                .sorted(Comparator.comparing(FuelResponse::getVehicleCounter))
                .collect(Collectors.toList());

        List<AdBlueResponse> blue = card.getAdBlue().stream()
                .map(fuelMapper::mapToAdBlueResponse)
                .toList();
        return new CardDetailsResponse(card.getNumber(), trips, fuels, blue);
    }

    public List<Card> retrieveCardsDateBetween(String username, LocalDateTime startDate, LocalDateTime endDate) {
        return repository.findAllByUsernameAndCreationTimeBetweenAndOrderByCreationTimeDesc(username, startDate, endDate);
    }

    public List<CardResponse> retrieveCardsForArchive(String username, String startDate, String endDate) {
        var start = parseDate(startDate);
        var end = parseDate(endDate);
        var result = retrieveCardsDateBetween(username, start, end);
        return result.stream()
                .map(cardMapper::mapCardToCardResponse)
                .toList();
    }

    public void deleteCard(Long cardId) {
        repository.findById(cardId).ifPresentOrElse(
                (card) -> repository.deleteById(card.getId()),
                () -> {
                    throw new CardNotFoundException();
                });
    }

    public LocalDateTime parseDate(String dateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(dateString, formatter);
    }
}
