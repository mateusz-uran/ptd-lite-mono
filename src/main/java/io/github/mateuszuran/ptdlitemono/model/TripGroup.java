package io.github.mateuszuran.ptdlitemono.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "trip_group")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TripGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cargoName;
    private Integer weight;
    private Integer temperature;
    private String notes;

    @OneToMany(mappedBy = "tripGroup", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Trip> trips = new ArrayList<>();

    public void addTripsToGroup(Trip trip) {
        trips.add(trip);
        trip.setTripGroup(this);
    }

    public void removeTripsFromGroup(Trip trip) {
        trips.remove(trip);
        trip.setTripGroup(null);
    }
}
