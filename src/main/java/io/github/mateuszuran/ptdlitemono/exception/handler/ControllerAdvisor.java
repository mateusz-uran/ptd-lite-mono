package io.github.mateuszuran.ptdlitemono.exception.handler;

import io.github.mateuszuran.ptdlitemono.exception.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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
        return createErrorResponse(exception, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({CardExistsException.class})
    public ResponseEntity<ErrorMessage> handleAddExistingCard(CardExistsException exception) {
        return createErrorResponse(exception, HttpStatus.CONFLICT);
    }

    @ExceptionHandler({CardEmptyException.class})
    public ResponseEntity<ErrorMessage> handleAddEmptyCard(CardEmptyException exception) {
        return createErrorResponse(exception, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({CsvFileException.class})
    public ResponseEntity<ErrorMessage> handleCsvFile(CsvFileException exception) {
        return createErrorResponse(exception, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({CardEmptyValuesException.class})
    public ResponseEntity<ErrorMessage> handleEmptyValuesInCard(CardEmptyValuesException exception) {
        return createErrorResponse(exception, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({UserNotFoundException.class})
    public ResponseEntity<ErrorMessage> handleUserNotFound(UserNotFoundException exception) {
        return createErrorResponse(exception, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({TripsEmptyException.class})
    public ResponseEntity<ErrorMessage> handleTripEmpty(TripsEmptyException exception) {
        return createErrorResponse(exception, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({PetrolEmptyException.class})
    public ResponseEntity<ErrorMessage> handlePetrolEmpty(PetrolEmptyException exception) {
        return createErrorResponse(exception, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({AdBlueEmptyException.class})
    public ResponseEntity<ErrorMessage> handleBlueEmpty(AdBlueEmptyException exception) {
        return createErrorResponse(exception, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({TripGroupNotFoundException.class})
    public ResponseEntity<ErrorMessage> handleGroupEmpty(TripGroupNotFoundException exception) {
        return createErrorResponse(exception, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({TripGroupException.class})
    public ResponseEntity<ErrorMessage> handleTripHasGroup(TripGroupException exception) {
        return createErrorResponse(exception, HttpStatus.CONFLICT);
    }

    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<ErrorMessage> handleTripHasGroup(IllegalArgumentException exception) {
        return createErrorResponse(exception, HttpStatus.NOT_FOUND);
    }

    private ResponseEntity<ErrorMessage> createErrorResponse(Exception exception, HttpStatus httpStatus) {
        ErrorMessage message = new ErrorMessage(
                httpStatus.value(),
                ErrorMessage.trimExceptionTimestamp(),
                exception.getMessage());
        return new ResponseEntity<>(message, httpStatus);
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
