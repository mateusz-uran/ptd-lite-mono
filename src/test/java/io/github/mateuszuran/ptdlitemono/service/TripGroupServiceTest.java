package io.github.mateuszuran.ptdlitemono.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@ExtendWith(MockitoExtension.class)
class TripGroupServiceTest {
    private TripGroupService service;

    @BeforeEach
    void setUp() {
        service = new TripGroupService();
    }

    @Test
    void givenTripGroupDto_whenSave_thenReturnCreatedGroup() {
        //given
        //when
        //then
    }
}