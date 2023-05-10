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
        if (repository.existsByNumberAndUsername(cardRequest.getNumber(), cardRequest.getUsername())) {
            throw new CardExistsException(cardRequest.getNumber());
        }

        if (cardRequest.getNumber().trim().isEmpty()) {
            throw new CardEmptyException();
        }

        var now = LocalDateTime.now();
        var date = LocalDateTime.of(year, month, dayOfMonth, now.getHour(), now.getMinute(), now.getSecond());
        var card = Card.builder()
                .number(cardRequest.getNumber())
                .username(cardRequest.getUsername())
                .creationTime(date)
                .build();
        repository.save(card);

        return cardMapper.mapToCardResponseWithFormattedCreationTime(card);
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

    public List<FuelResponse> getFuelsFromCard(Long id) {
        return repository.findById(id)
                .orElseThrow(CardNotFoundException::new)
                .getFuels().stream()
                .map(fuelMapper::mapToFuelResponseWithModelMapper)
                .sorted(Comparator.comparing(FuelResponse::getVehicleCounter))
                .collect(Collectors.toList());
    }

    public List<TripResponse> getTripsFromCard(Long id) {
        return repository.findById(id)
                .orElseThrow(CardNotFoundException::new)
                .getTrips().stream()
                .map(tripMapper::mapToTripResponseWithModelMapper)
                .sorted(Comparator.comparing(TripResponse::getCounterEnd))
                .collect(Collectors.toList());
    }

    public CardDetailsResponse getCardDetails(Long id) {
        Card card = repository.findById(id).orElseThrow(CardNotFoundException::new);
        List<FuelResponse> fuels = card.getFuels().stream()
                .map(fuelMapper::mapToFuelResponseWithModelMapper)
                .sorted(Comparator.comparing(FuelResponse::getVehicleCounter))
                .collect(Collectors.toList());
        List<TripResponse> trips = card.getTrips().stream()
                .map(tripMapper::mapToTripResponseWithModelMapper)
                .sorted(Comparator.comparing(TripResponse::getCounterEnd))
                .collect(Collectors.toList());
        return new CardDetailsResponse(trips, fuels);
    }
}
