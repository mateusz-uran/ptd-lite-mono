package io.github.mateuszuran.ptdlitemono.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cards")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String number;
    private String username;
    @Column(name = "creation_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime creationTime;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "card")
    private List<Trip> trips = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "card")
    private List<Fuel> fuels = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "card")
    private List<AdBlue> adBlue = new ArrayList<>();

    public void addTrip(Trip trip) {
        this.trips.add(trip);
        trip.setCard(this);
    }

    public void addFuel(Fuel fuel) {
        this.fuels.add(fuel);
        fuel.setCard(this);
    }

    public void addBlue(AdBlue blue) {
        this.adBlue.add(blue);
        blue.setCard(this);
    }
}
