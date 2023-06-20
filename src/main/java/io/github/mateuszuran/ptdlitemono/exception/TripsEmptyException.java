package io.github.mateuszuran.ptdlitemono.exception;

public class TripsEmptyException extends RuntimeException {
    public TripsEmptyException() {
        super("Trips data is empty");
    }
}
