package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.*;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

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

    public CardResponse saveCard(CardRequest cardRequest, int year, int month, int dayOfMonth) {
        if (repository.existsByNumberIgnoreCaseAndUsername(cardRequest.getNumber(), cardRequest.getUsername())) {
            throw new CardExistsException(cardRequest.getNumber());
        }

        if (cardRequest.getNumber().trim().isEmpty()) {
            throw new CardEmptyException();
        }

        var now = LocalDateTime.now();
        var date = LocalDateTime.of(year, month, dayOfMonth, now.getHour(), now.getMinute(), now.getSecond());
        var card = Card.builder()
                .number(cardRequest.getNumber().toUpperCase())
                .username(cardRequest.getUsername())
                .creationTime(date)
                .build();
        var result = repository.save(card);

        return cardMapper.mapToCardResponseWithFormattedCreationTime(result);
    }

    public List<Card> getAllCardsByUserAndDate(String username, int year, int month) {
        var actualDate = LocalDate.of(year, month, 1);

        LocalDateTime startDate = actualDate.with(firstDayOfMonth()).atStartOfDay();
        LocalDateTime endDate = actualDate.with(lastDayOfMonth()).atStartOfDay();

        return repository.findAllByUsernameAndCreationTimeBetween(username, startDate, endDate);
    }

    public List<CardResponse> getCardsSorted(String username, int year, int month) {
        return getAllCardsByUserAndDate(username, year, month).stream().map(cardMapper::mapToCardResponseWithFormattedCreationTime)
                .sorted(Comparator.comparing(CardResponse::getCreationTime).reversed())
                .toList();
    }

    public void deleteCard(Long cardId) {
        repository.findById(cardId).ifPresentOrElse(
                (card) -> repository.deleteById(card.getId()),
                () -> {
                    throw new CardNotFoundException();
                });
    }

    public CardDetailsResponse getCardDetails(Long id) {
        Card card = repository.findById(id).orElseThrow(CardNotFoundException::new);

        List<FuelResponse> fuels = card.getFuels().stream()
                .map(fuelMapper::mapToFuelResponse)
                .sorted(Comparator.comparing(FuelResponse::getVehicleCounter))
                .collect(Collectors.toList());

        List<TripResponse> trips = card.getTrips().stream()
                .map(tripMapper::mapToTripResponseWithModelMapper)
                .sorted(Comparator.comparing(TripResponse::getCounterEnd))
                .collect(Collectors.toList());

        List<AdBlueResponse> blue = card.getAdBlue().stream()
                .map(fuelMapper::mapToAdBlueResponse)
                .toList();
        return new CardDetailsResponse(null, trips, fuels, blue);
    }

    public void updateCard(Card card) {
        repository.save(card);
    }

    public void saveNewCard(CardRequest cardRequest) {
        if (repository.existsByNumberIgnoreCaseAndUsername(cardRequest.getNumber(), cardRequest.getUsername())) {
            throw new CardExistsException(cardRequest.getNumber());
        }

        if (cardRequest.getNumber().isEmpty() || cardRequest.getNumber().trim().isEmpty()) {
            throw new CardEmptyException();
        }

        var now = LocalDateTime.now();
        var card = Card.builder()
                .number(cardRequest.getNumber().toUpperCase())
                .username(cardRequest.getUsername())
                .creationTime(now)
                .build();
        repository.save(card);
    }

    public CardResponse editCard(Long cardId, String number) {
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

    public CardDetailsResponse getCardData(Long cardId) {
        Card card = repository.findById(cardId).orElseThrow(CardNotFoundException::new);

        List<FuelResponse> fuels = card.getFuels().stream()
                .map(fuelMapper::mapToFuelResponse)
                .sorted(Comparator.comparing(FuelResponse::getVehicleCounter))
                .collect(Collectors.toList());

        List<TripResponse> trips = card.getTrips().stream()
                .map(tripMapper::mapToTripResponseWithModelMapper)
                .sorted(Comparator.comparing(TripResponse::getCounterEnd))
                .collect(Collectors.toList());

        List<AdBlueResponse> blue = card.getAdBlue().stream()
                .map(fuelMapper::mapToAdBlueResponse)
                .toList();
        return new CardDetailsResponse(card.getNumber(), trips, fuels, blue);
    }

    public LocalDateTime parseDate(String dateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(dateString, formatter);
    }

    public List<Card> retrieveCardsDateBetween(String username, LocalDateTime startDate, LocalDateTime endDate) {
        return repository.findAllByUsernameAndCreationTimeBetweenAndOrderByCreationTimeDesc(username, startDate, endDate);
    }

    public List<CardResponse> retrieveCards(String username, String startDate, String endDate) {
        var start = parseDate(startDate);
        var end = parseDate(endDate);
        var result = retrieveCardsDateBetween(username, start, end);
        return result.stream()
                .map(cardMapper::mapToCardResponseWithModelMapper)
                .toList();
    }
}
