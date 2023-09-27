package io.github.mateuszuran.ptdlitemono.helpers;

import io.github.mateuszuran.ptdlitemono.dto.request.AdBlueRequest;
import io.github.mateuszuran.ptdlitemono.dto.request.FuelRequest;
import io.github.mateuszuran.ptdlitemono.dto.request.TripRequest;
import io.github.mateuszuran.ptdlitemono.dto.response.*;
import io.github.mateuszuran.ptdlitemono.model.*;
import io.github.mateuszuran.ptdlitemono.service.logic.csv.UserPdfInformationSkeleton;
import io.github.mateuszuran.ptdlitemono.service.logic.json.pojo.HourRateJsonSkeleton;
import io.github.mateuszuran.ptdlitemono.service.logic.json.pojo.UserRates;
import io.github.mateuszuran.ptdlitemono.service.logic.pdf.pojo.Counters;
import io.github.mateuszuran.ptdlitemono.service.logic.pdf.pojo.PdfSource;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public List<Card> cardModelFroStatistic(String username, LocalDateTime creationTimeFirstCard, LocalDateTime creationTimeSecondCard) {
        List<Card> cards = new ArrayList<>();
        Trip trip1 = Trip.builder()
                .dayStart("10.07.2023")
                .dayEnd("10.07.2023")
                .counterStart(152321)
                .counterEnd(152776)
                .carMileage(455)
                .build();
        Trip trip2 = Trip.builder()
                .dayStart("10.07.2023")
                .dayEnd("11.07.2023")
                .counterStart(152776)
                .counterEnd(153121)
                .carMileage(345)
                .build();

        Card card1 = Card.builder()
                .id(2L)
                .number("XYZ")
                .username(username)
                .creationTime(creationTimeFirstCard)
                .trips(createTripsModel())
                .build();
        Card card2 = Card.builder()
                .id(4L)
                .number("ABC")
                .username(username)
                .creationTime(creationTimeSecondCard)
                .trips(List.of(trip1, trip2))
                .build();
        cards.add(card1);
        cards.add(card2);
        return cards;
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

    public Counters readyCountersForPdf() {
        var firstTrip = cardDtoResponseForPdf().getTrips().stream().mapToInt(TripResponse::getCounterStart).min();
        var lastTrip = cardDtoResponseForPdf().getTrips().stream().mapToInt(TripResponse::getCounterEnd).max();
        var tripsMileage = cardDtoResponseForPdf().getTrips().stream().mapToInt(TripResponse::getCarMileage).sum();
        var petrolSum = cardDtoResponseForPdf().getFuels().stream().mapToInt(FuelResponse::getRefuelingAmount).sum();
        //when trips are empty
        int firstCounter = firstTrip.orElse(0);
        int lastCounter = lastTrip.orElse(0);

        return Counters.builder()
                .firstCounter(firstCounter)
                .lastCounter(lastCounter)
                .mileage(tripsMileage)
                .refuelingSum(petrolSum)
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

    public PdfSource skeletonForPdf(UserPdfInformationSkeleton userInfo) {
        var cardDetailResp = cardDtoResponseForPdf();
        return PdfSource.builder()
                .userPdfSkeleton(userInfo)
                .counters(readyCountersForPdf())
                .cardNumber(cardDetailResp.getCardNumber())
                .cardTripsList(cardDetailResp.getTrips())
                .cardFuelsList(cardDetailResp.getFuels())
                .cardAdBlueList(cardDetailResp.getBlue())
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
                .dayStart("01.07.2023")
                .dayEnd("01.07.2023")
                .counterStart(150112)
                .counterEnd(150320)
                .carMileage(208)
                .build();
        Trip trip2 = Trip.builder()
                .dayStart("02.07.2023")
                .dayEnd("03.07.2023")
                .counterStart(150320)
                .counterEnd(150610)
                .carMileage(290)
                .build();
        Trip trip3 = Trip.builder()
                .dayStart("03.07.2023")
                .dayEnd("05.07.2023")
                .counterStart(150610)
                .counterEnd(150821)
                .carMileage(211)
                .build();
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
                .counterEnd(150320)
                .carMileage(208)
                .build();
        TripResponse trip2 = TripResponse.builder()
                .locationEnd("Berlin")
                .counterStart(150320)
                .counterEnd(150610)
                .carMileage(290)
                .build();
        TripResponse trip3 = TripResponse.builder()
                .locationEnd("Dover")
                .counterStart(150610)
                .counterEnd(150821)
                .carMileage(211)
                .build();
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
        Fuel fuel3 = Fuel.builder().refuelingAmount(500).vehicleCounter(151102).build();
        Fuel fuel4 = Fuel.builder().refuelingAmount(600).vehicleCounter(151136).build();
        fuels.add(fuel1);
        fuels.add(fuel2);
        fuels.add(fuel3);
        fuels.add(fuel4);
        return fuels;
    }

    private List<FuelResponse> createFueLResponse() {
        List<FuelResponse> fuel = new ArrayList<>();
        FuelResponse fuel1 = FuelResponse.builder().refuelingAmount(300).vehicleCounter(150100).build();
        FuelResponse fuel2 = FuelResponse.builder().refuelingAmount(400).vehicleCounter(150750).build();
        FuelResponse fuel3 = FuelResponse.builder().refuelingAmount(500).vehicleCounter(151102).build();
        FuelResponse fuel4 = FuelResponse.builder().refuelingAmount(600).vehicleCounter(151136).build();
        fuel.add(fuel1);
        fuel.add(fuel2);
        fuel.add(fuel3);
        fuel.add(fuel4);
        return fuel;
    }

    public List<AdBlueRequest> createAdBlueRequest() {
        List<AdBlueRequest> blues = new ArrayList<>();
        AdBlueRequest blue1 = AdBlueRequest.builder().adBlueDate("1.01").build();
        AdBlueRequest blue2 = AdBlueRequest.builder().adBlueDate("2.01").build();
        blues.add(blue1);
        blues.add(blue2);
        return blues;
    }

    public List<AdBlue> createAdBlueModel() {
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

    public HourRateJsonSkeleton expectedJsonValues() {
        Map<String, Float> rates1 = new HashMap<>();
        rates1.put("DE", 15f);
        rates1.put("BE", 18.5f);
        rates1.put("FR", 12.87f);
        rates1.put("NL", 13.56f);

        Map<String, Float> rates2 = new HashMap<>();
        rates2.put("DE", 14.5f);
        rates2.put("BE", 16f);
        rates2.put("FR", 11.53f);
        rates2.put("NL", 14.77f);

        UserRates johnsRates = UserRates.builder()
                .username("john")
                .defaultRate("0.32")
                .rates(List.of(rates1))
                .build();
        UserRates willsRates = UserRates.builder()
                .username("will")
                .defaultRate("0.77")
                .rates(List.of(rates2))
                .build();

        return HourRateJsonSkeleton.builder()
                .users(List.of(johnsRates, willsRates)).build();
    }

    public List<CardStatistics> createCardStatisticListWithRandomMonth(String username, int year) {
        CardStatistics stat1 = CardStatistics.builder()
                .username(username)
                .yearMonth(YearMonth.of(year, 3))
                .cardMileage(300)
                .cardCounter(2).build();
        CardStatistics stat2 = CardStatistics.builder()
                .username(username)
                .yearMonth(YearMonth.of(year, 5))
                .cardMileage(482)
                .cardCounter(3).build();
        CardStatistics stat3 = CardStatistics.builder()
                .username(username)
                .yearMonth(YearMonth.of(year, 6))
                .cardMileage(590)
                .cardCounter(6).build();
        return List.of(stat1, stat2, stat3);
    }

    public CardStatistics createCardStatisticListWithSpecificYearAndMonth(String username, int year, int month) {
        return CardStatistics.builder()
                .username(username)
                .yearMonth(YearMonth.of(year, month))
                .cardMileage(300)
                .cardCounter(2).build();
    }

    public List<CardStatisticResponse> createCardStatisticResponseListWithRandomMonth() {
        CardStatisticResponse stat1 = CardStatisticResponse.builder()
                .cardMileage(300)
                .cardCounter(2).build();
        CardStatisticResponse stat2 = CardStatisticResponse.builder()
                .cardMileage(482)
                .cardCounter(3).build();
        CardStatisticResponse stat3 = CardStatisticResponse.builder()
                .cardMileage(590)
                .cardCounter(6).build();
        return List.of(stat1, stat2, stat3);
    }

    public CardStatisticResponse createCardStatisticResponseListWithSpecificYearAndMonth(int year, int month) {
        return CardStatisticResponse.builder()
                .cardMileage(300)
                .cardCounter(2)
                .yearMonth(YearMonth.of(year, month))
                .build();
    }
}
