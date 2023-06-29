package io.github.mateuszuran.ptdlitemono.exception;

public class AdBlueEmptyException extends RuntimeException {
    public AdBlueEmptyException() {
        super("AdBlue data is empty");
    }
}
