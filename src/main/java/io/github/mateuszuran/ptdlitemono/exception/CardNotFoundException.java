package io.github.mateuszuran.ptdlitemono.exception;

public class CardNotFoundException extends RuntimeException {
    public CardNotFoundException() {
        super("Card not found.");
    }
}
