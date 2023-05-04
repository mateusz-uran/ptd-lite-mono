package io.github.mateuszuran.ptdlitemono.exception.handler;

import io.github.mateuszuran.ptdlitemono.exception.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

    @ExceptionHandler({CardNotFoundException.class})
    public ResponseEntity<ErrorMessage> handleCardNotFound(CardNotFoundException exception) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                ErrorMessage.trimExceptionTimestamp(),
                exception.getMessage());
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({CardExistsException.class})
    public ResponseEntity<ErrorMessage> handleAddExistingCard(CardExistsException exception) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.CONFLICT.value(),
                ErrorMessage.trimExceptionTimestamp(),
                exception.getMessage());
        return new ResponseEntity<>(message, HttpStatus.CONFLICT);
    }

    @ExceptionHandler({CardEmptyException.class})
    public ResponseEntity<ErrorMessage> handleAddEmptyCard(CardEmptyException exception) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                ErrorMessage.trimExceptionTimestamp(),
                exception.getMessage());
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({CsvFileException.class})
    public ResponseEntity<ErrorMessage> handleCsvFile(CsvFileException exception) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                ErrorMessage.trimExceptionTimestamp(),
                exception.getMessage());
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({CardEmptyValuesException.class})
    public ResponseEntity<ErrorMessage> handleEmptyValuesInCard(CsvFileException exception) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                ErrorMessage.trimExceptionTimestamp(),
                exception.getMessage());
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({UserNotFoundException.class})
    public ResponseEntity<ErrorMessage> handleUserNotFound(CsvFileException exception) {
        ErrorMessage message = new ErrorMessage(
                HttpStatus.FORBIDDEN.value(),
                ErrorMessage.trimExceptionTimestamp(),
                exception.getMessage());
        return new ResponseEntity<>(message, HttpStatus.FORBIDDEN);
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    static class ErrorMessage {
        private int statusCode;
        private String timestamp;
        private String description;

        static String trimExceptionTimestamp() {
            var result = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            return result.format(formatter);
        }
    }
}
