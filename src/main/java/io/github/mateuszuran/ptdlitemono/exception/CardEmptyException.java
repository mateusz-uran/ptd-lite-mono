package io.github.mateuszuran.ptdlitemono.exception;

public class CardEmptyException extends RuntimeException {
    public CardEmptyException() {
        super("Card is empty.");
    }
}
