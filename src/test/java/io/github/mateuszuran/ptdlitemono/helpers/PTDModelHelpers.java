package io.github.mateuszuran.ptdlitemono.helpers;

import io.github.mateuszuran.ptdlitemono.dto.request.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlitemono.dto.request.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.*;
import io.github.mateuszuran.ptdlitemono.model.AdBlue;
import io.github.mateuszuran.ptdlitemono.model.Card;
import io.github.mateuszuran.ptdlitemono.model.Fuel;
import io.github.mateuszuran.ptdlitemono.model.Trip;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class PTDModelHelpers {

    public List<Card> createCardsModel() {
        var cardOne = Card.builder().username("admin").number("ABC")
                .creationTime(LocalDateTime.of(2023, 5, 1, 12, 0)).build();
        var cardTwo = Card.builder().username("admin").number("DEF")
                .creationTime(LocalDateTime.of(2023, 5, 2, 13, 0)).build();
        var cardThree = Card.builder().username("admin").number("GHI")
                .creationTime(LocalDateTime.of(2023, 5, 3, 14, 0)).build();
        var cardFour = Card.builder().username("admin").number("JKL")
                .creationTime(LocalDateTime.of(2023, 5, 4, 15, 0)).build();
        return List.of(cardOne, cardTwo, cardThree, cardFour);
    }

    public List<Card> createCardsModelSorted() {
        var cardOne = Card.builder().username("admin").number("ABC")
                .creationTime(LocalDateTime.of(2023, 5, 1, 12, 0)).build();
        var cardTwo = Card.builder().username("admin").number("DEF")
                .creationTime(LocalDateTime.of(2023, 5, 2, 13, 0)).build();
        var cardThree = Card.builder().username("admin").number("GHI")
                .creationTime(LocalDateTime.of(2023, 5, 3, 14, 0)).build();
        var cardFour = Card.builder().username("admin").number("JKL")
                .creationTime(LocalDateTime.of(2023, 5, 4, 15, 0)).build();
        return List.of(cardFour, cardThree, cardTwo, cardOne);
    }

    public List<CardResponse> createCardResponseSortedDesc() {
        var cardOne = CardResponse.builder().number("ABC")
                .creationTime(formattedTimeString(LocalDateTime.of(2023, 5, 1, 12, 0))).build();
        var cardTwo = CardResponse.builder().number("DEF")
                .creationTime(formattedTimeString(LocalDateTime.of(2023, 5, 2, 13, 0))).build();
        var cardThree = CardResponse.builder().number("GHI")
                .creationTime(formattedTimeString(LocalDateTime.of(2023, 5, 3, 14, 0))).build();
        var cardFour = CardResponse.builder().number("JKL")
                .creationTime(formattedTimeString(LocalDateTime.of(2023, 5, 4, 15, 0))).build();
        return List.of(cardFour, cardThree, cardTwo, cardOne);
    }

    public List<CardResponse> createCardResponse() {
        CardResponse response1 = CardResponse.builder()
                .creationTime("2023-05-1 12:00:00").build();
        CardResponse response2 = CardResponse.builder()
                .creationTime("2023-05-2 13:00:00").build();
        CardResponse response3 = CardResponse.builder()
                .creationTime("2023-05-3 14:00:00").build();
        CardResponse response4 = CardResponse.builder()
                .creationTime("2023-05-4 15:00:00").build();
        return List.of(response4, response3, response2, response1);
    }

    private String formattedTimeString(LocalDateTime time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return time.format(formatter);
    }


    public Card cardModelForPdf() {
        return Card.builder()
                .id(123L)
                .number("XYZ")
                .trips(createTripsModel())
                .fuels(createFuelsModel())
                .adBlue(createAdBlueModel())
                .build();
    }

    public CardDetailsResponse cardDtoResponseForPdf() {
        return CardDetailsResponse.builder()
                .cardNumber("XYZ")
                .trips(createTripsResponse())
                .fuels(createFueLResponse())
                .blue(createAdBlueResponse())
                .build();
    }

    public List<TripRequest> createTripRequest() {
        List<TripRequest> trips = new ArrayList<>();
        TripRequest request1 = TripRequest.builder()
                .counterStart(500)
                .counterEnd(1500).build();
        TripRequest request2 = TripRequest.builder()
                .counterStart(1600)
                .counterEnd(1842).build();
        TripRequest request3 = TripRequest.builder()
                .counterStart(1900)
                .counterEnd(2400).build();
        trips.add(request1);
        trips.add(request2);
        trips.add(request3);
        return trips;
    }

    public List<Trip> createTripsModel() {
        List<Trip> trips = new ArrayList<>();
        Trip trip1 = Trip.builder()
                .counterStart(150112)
                .counterEnd(150320).build();
        Trip trip2 = Trip.builder()
                .counterStart(150320)
                .counterEnd(150610).build();
        Trip trip3 = Trip.builder()
                .counterStart(150610)
                .counterEnd(150821).build();
        trips.add(trip1);
        trips.add(trip2);
        trips.add(trip3);
        return trips;
    }

    private List<TripResponse> createTripsResponse() {
        List<TripResponse> trips = new ArrayList<>();
        TripResponse trip1 = TripResponse.builder()
                .locationEnd("Warsaw")
                .counterStart(150112)
                .counterEnd(150320).build();
        TripResponse trip2 = TripResponse.builder()
                .locationEnd("Berlin")
                .counterStart(150320)
                .counterEnd(150610).build();
        TripResponse trip3 = TripResponse.builder()
                .locationEnd("Dover")
                .counterStart(150610)
                .counterEnd(150821).build();
        trips.add(trip1);
        trips.add(trip2);
        trips.add(trip3);
        return trips;
    }

    public List<FuelRequest> createFuelRequests() {
        List<FuelRequest> fuels = new ArrayList<>();
        FuelRequest fuel1 = FuelRequest.builder().refuelingAmount(300).vehicleCounter(150100).build();
        FuelRequest fuel2 = FuelRequest.builder().refuelingAmount(400).vehicleCounter(150750).build();
        FuelRequest fuel3 = FuelRequest.builder().refuelingAmount(500).vehicleCounter(151102).build();
        FuelRequest fuel4 = FuelRequest.builder().refuelingAmount(600).vehicleCounter(151136).build();
        fuels.add(fuel1);
        fuels.add(fuel2);
        fuels.add(fuel3);
        fuels.add(fuel4);
        return fuels;
    }

    public List<Fuel> createFuelsModel() {
        List<Fuel> fuels = new ArrayList<>();
        Fuel fuel1 = Fuel.builder().refuelingAmount(300).vehicleCounter(150100).build();
        Fuel fuel2 = Fuel.builder().refuelingAmount(400).vehicleCounter(150750).build();
        fuels.add(fuel1);
        fuels.add(fuel2);
        return fuels;
    }

    private List<FuelResponse> createFueLResponse() {
        List<FuelResponse> fuel = new ArrayList<>();
        FuelResponse fuel1 = FuelResponse.builder().refuelingAmount(300).vehicleCounter(150100).build();
        FuelResponse fuel2 = FuelResponse.builder().refuelingAmount(400).vehicleCounter(150750).build();
        fuel.add(fuel1);
        fuel.add(fuel2);
        return fuel;
    }

    private List<AdBlueRequest> createAdBlueRequest() {
        List<AdBlueRequest> blues = new ArrayList<>();
        AdBlueRequest blue1 = AdBlueRequest.builder().adBlueDate("1.01").build();
        AdBlueRequest blue2 = AdBlueRequest.builder().adBlueDate("2.01").build();
        AdBlueRequest blue3 = AdBlueRequest.builder().adBlueDate("3.01").build();
        AdBlueRequest blue4 = AdBlueRequest.builder().adBlueDate("4.01").build();
        blues.add(blue1);
        blues.add(blue2);
        blues.add(blue3);
        blues.add(blue4);
        return blues;
    }

    private List<AdBlue> createAdBlueModel() {
        List<AdBlue> blues = new ArrayList<>();
        AdBlue blue1 = AdBlue.builder().adBlueDate("12.03.2023").build();
        AdBlue blue2 = AdBlue.builder().adBlueDate("14.03.2023").build();
        blues.add(blue1);
        blues.add(blue2);
        return blues;
    }

    private List<AdBlueResponse> createAdBlueResponse() {
        List<AdBlueResponse> blue = new ArrayList<>();
        AdBlueResponse blue1 = AdBlueResponse.builder().adBlueDate("12.03.2023").build();
        AdBlueResponse blue2 = AdBlueResponse.builder().adBlueDate("14.03.2023").build();
        blue.add(blue1);
        blue.add(blue2);
        return blue;
    }
}
