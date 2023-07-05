import React from 'react';

const TestTripTable = ({ tripDummyEntities }) => {
  const getRowSpan = (index) => {
    let rowspan = 1;
    const currentGroup = tripDummyEntities[index]?.group?.id;

    for (let i = index - 1; i >= 0; i--) {
      const prevGroup = tripDummyEntities[i]?.group?.id;
      if (currentGroup && currentGroup === prevGroup) {
        rowspan++;
      } else {
        break;
      }
    }

    for (let i = index + 1; i < tripDummyEntities.length; i++) {
      const nextGroup = tripDummyEntities[i]?.group?.id;
      if (currentGroup && currentGroup === nextGroup) {
        rowspan++;
      } else {
        break;
      }
    }

    return rowspan;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Start Date</th>
          <th>Start Time</th>
          <th>Start Location</th>
          <th>End Date</th>
          <th>End Time</th>
          <th>End Location</th>
          <th>Start Country</th>
          <th>End Country</th>
          <th>Start Counter</th>
          <th>End Counter</th>
          <th>Group</th>
        </tr>
      </thead>
      <tbody>
        {tripDummyEntities.map((trip, index) => (
          <tr key={trip.id}>
            <td>{trip.id}</td>
            <td>{trip.dayStart}</td>
            <td>{trip.hourStart}</td>
            <td>{trip.locationStart}</td>
            <td>{trip.dayEnd}</td>
            <td>{trip.hourEnd}</td>
            <td>{trip.locationEnd}</td>
            <td>{trip.countryStart}</td>
            <td>{trip.countryEnd}</td>
            <td>{trip.counterStart}</td>
            <td>{trip.counterEnd}</td>
            {index === 0 ||
            trip.group?.id !== tripDummyEntities[index - 1]?.group?.id ||
            trip.group === null ? (
              <td rowSpan={getRowSpan(index)} className="row-span-cell">
                {trip.group?.cargoName}
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TestTripTable;
