package io.github.mateuszuran.ptdlitemono.exception;

public class CsvFileException extends RuntimeException {
    public CsvFileException() {
        super("PDF cannot be generated, please try again later.");
    }
}
