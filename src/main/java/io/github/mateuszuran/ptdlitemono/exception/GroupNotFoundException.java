package io.github.mateuszuran.ptdlitemono.exception;

public class GroupNotFoundException extends RuntimeException {
    public GroupNotFoundException() {
        super("Group not found.");
    }
}
