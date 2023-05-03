package io.github.mateuszuran.ptdlitemono.exception;

public class CardExistsException extends RuntimeException {
    public CardExistsException(String number) {
        super("Card with number: " + number + " already exists.");
    }
}