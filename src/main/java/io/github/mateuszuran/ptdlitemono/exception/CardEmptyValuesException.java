package io.github.mateuszuran.ptdlitemono.exception;

public class CardEmptyValuesException extends RuntimeException {
    public CardEmptyValuesException() { super("Card's trips cannot be empty"); }
}
