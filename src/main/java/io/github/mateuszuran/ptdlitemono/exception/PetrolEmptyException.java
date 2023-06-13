package io.github.mateuszuran.ptdlitemono.exception;

public class PetrolEmptyException extends RuntimeException{
    public PetrolEmptyException() {
        super("Petrol data is empty");
    }
}
