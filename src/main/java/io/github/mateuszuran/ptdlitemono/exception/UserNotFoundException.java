package io.github.mateuszuran.ptdlitemono.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() { super("User not found in csv file, please contact admin."); }
}
