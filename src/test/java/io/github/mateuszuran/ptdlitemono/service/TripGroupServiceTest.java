package io.github.mateuszuran.ptdlitemono.service;

import io.github.mateuszuran.ptdlitemono.dto.TripGroupDto;
import io.github.mateuszuran.ptdlitemono.exception.CardNotFoundException;
import io.github.mateuszuran.ptdlitemono.exception.GroupNotFoundException;
import io.github.mateuszuran.ptdlitemono.mapper.TripGroupMapper;
import io.github.mateuszuran.ptdlitemono.model.TripGroup;
import io.github.mateuszuran.ptdlitemono.repository.TripGroupRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TripGroupServiceTest {
    private TripGroupService service;
    @Mock
    private TripGroupRepository repository;
    @Mock
    private TripGroupMapper mapper;

    @BeforeEach
    void setUp() {
        service = new TripGroupService(repository, mapper);
    }

    @Test
    void givenTripGroup_whenSave_thenReturnGroupDto() {
        // given
        TripGroupDto request = createGroupDto();

        TripGroup group = createGroup();

        when(mapper.mapToTripGroup(request)).thenReturn(group);
        when(repository.save(group)).thenReturn(group);
        when(mapper.mapToDto(group)).thenReturn(request);
        // when
        var result = service.createGroup(request);
        // then
        verify(repository, times(1)).save(group);
        assertThat(result.getCargoName()).isEqualTo(group.getCargoName());
    }

    @Test
    void givenCargoName_whenExists_returnGroup() {
        //given
        TripGroup group = createGroup();
        TripGroupDto response = createGroupDto();
        when(repository.findByCargoName(group.getCargoName())).thenReturn(Optional.of(group));
        when(mapper.mapToDto(group)).thenReturn(response);
        //when
        var result = service.getGroup(group.getCargoName());
        //then
        assertThat(result.getTemperature()).isEqualTo(15);
    }

    @Test
    void givenCargoName_whenNotFound_thenThrowException() {
        //given
        String cargoName = "medicine";
        when(repository.findByCargoName(cargoName)).thenReturn(Optional.empty());
        //when + then
        assertThatThrownBy(() -> service.getGroup(cargoName))
                .isInstanceOf(GroupNotFoundException.class)
                .hasMessageContaining("Group not found");
    }

    private static TripGroup createGroup() {
        return TripGroup.builder()
                .id(1L)
                .cargoName("medicine")
                .temperature(15)
                .weight(20)
                .tripsIds(List.of(2L, 3L, 4L, 5L))
                .build();
    }

    private static TripGroupDto createGroupDto() {
        return TripGroupDto.builder()
                .cargoName("medicine")
                .temperature(15)
                .weight(20)
                .tripsIds(List.of(2L, 3L, 4L, 5L))
                .build();
    }
}