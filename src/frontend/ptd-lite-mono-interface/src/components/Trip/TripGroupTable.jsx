import React, { useState } from 'react';

function TripGroupTable(props) {
  const { cardTrips } = props;
  const [trips, setTrips] = useState(cardTrips);

  const renderGroup = (group) => {
    return (
      <div>
        <p>{group.cargoName}</p>
        <p>{group.temperature}</p>
        <p>{group.weight}</p>
      </div>
    );
  };

  const renderRows = () => {
    const rows = [];
    let currentGroup = null;
    let rowspanCount = 0;

    for (let i = 0; i < trips.length; i++) {
      const trip = trips[i];
      const { group } = trip;

      if (group === currentGroup) {
        rowspanCount++;
      } else {
        if (currentGroup !== null) {
          // Add a row with rowspan for the previous group
          rows.push(
            <tr key={`group_${i}_${currentGroup}`}>
              <td rowSpan={rowspanCount}>{renderGroup(currentGroup)}</td>
            </tr>
          );
        }

        currentGroup = group;
        rowspanCount = 1;
      }

      rows.push(
        <tr key={`trip_${i}_${trip.id}`}>
          <td>
            <input type="checkbox" />
          </td>
          <td>{trip.dayStart}</td>
          <td>{trip.hourStart}</td>
          <td>{trip.locationStart}</td>
          <td>{trip.countryStart}</td>
          <td>{trip.counterStart}</td>
          <td>{trip.dayEnd}</td>
          <td>{trip.hourEnd}</td>
          <td>{trip.locationEnd}</td>
          <td>{trip.countryEnd}</td>
          <td>{trip.counterEnd}</td>
          <td>{trip.carMileage}</td>
          <td>{trip.group && renderGroup(trip.group)}</td>
        </tr>
      );
    }

    // Add the last group with rowspan
    if (currentGroup !== null) {
      rows.push(
        <tr key={`group_${trips.length}_${currentGroup}`}>
          <td rowSpan={rowspanCount}>{renderGroup(currentGroup)}</td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Day Start</th>
            <th>Hour Start</th>
            <th>Location Start</th>
            <th>Country Start</th>
            <th>Counter Start</th>
            <th>Day End</th>
            <th>Hour End</th>
            <th>Location End</th>
            <th>Country End</th>
            <th>Counter End</th>
            <th>Car Mileage</th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
}

export default TripGroupTable;
