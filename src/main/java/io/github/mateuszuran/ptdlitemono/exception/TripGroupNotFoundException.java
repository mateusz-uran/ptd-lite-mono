package io.github.mateuszuran.ptdlitemono.exception;

public class TripGroupNotFoundException extends RuntimeException {
    public TripGroupNotFoundException() {
        super("Group not found");
    }
}
