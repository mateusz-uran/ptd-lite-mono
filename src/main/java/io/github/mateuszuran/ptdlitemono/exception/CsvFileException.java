package io.github.mateuszuran.ptdlitemono.exception;

public class CsvFileException extends RuntimeException {
    public CsvFileException() {
        super("Cant read csv file.");
    }
}
