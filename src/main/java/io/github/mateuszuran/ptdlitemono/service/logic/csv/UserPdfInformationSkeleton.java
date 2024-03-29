package io.github.mateuszuran.ptdlitemono.service.logic.csv;

import com.opencsv.bean.CsvBindByPosition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPdfInformationSkeleton {
    @CsvBindByPosition(position = 0)
    private String username;
    @CsvBindByPosition(position = 1)
    private String truckModel;
    @CsvBindByPosition(position = 2)
    private String truckType;
    @CsvBindByPosition(position = 3)
    private String truckLicencePlate;
    @CsvBindByPosition(position = 4)
    private String truckLeftTankFuelCapacity;
    @CsvBindByPosition(position = 5)
    private String truckRightTankFuelCapacity;
    @CsvBindByPosition(position = 6)
    private String truckFullTankCapacity;
    @CsvBindByPosition(position = 7)
    private String truckAdBlueCapacity;
    @CsvBindByPosition(position = 8)
    private String trailerType;
    @CsvBindByPosition(position = 9)
    private String trailerLicensePlate;
    @CsvBindByPosition(position = 10)
    private String trailerFuelCapacity;
    @CsvBindByPosition(position = 11)
    private String truckImageLink;
    @CsvBindByPosition(position = 12)
    private String truckImageDescription;
    @CsvBindByPosition(position = 13)
    private String ceoDetailsLink;
    @CsvBindByPosition(position = 14)
    private String driverSurname;
}