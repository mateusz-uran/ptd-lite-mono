const TestTripTable = ({ tripDummyEntities }) => {
  const getRowSpan = (index) => {
    let rowspan = 1;
    const currentGroup = tripDummyEntities[index]?.group?.cargoName;
    const nextGroup = tripDummyEntities[index + 1]?.group?.cargoName;

    if (currentGroup && currentGroup === nextGroup) {
      rowspan = getRowSpan(index + 1) + 1;
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
          <th>Cargo Name</th>
        </tr>
      </thead>
      <tbody>
        {tripDummyEntities.map((trip, index) => {
          const rowspan = getRowSpan(index);
          const groupCargoName = trip.group?.cargoName;
          const isRowspanGroup = rowspan > 1 && index === 0;

          return (
            <tr key={trip.id} className={rowspan > 1 ? 'rowspan-group' : ''}>
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
              groupCargoName !==
                tripDummyEntities[index - 1]?.group?.cargoName ? (
                <td rowSpan={rowspan}>{groupCargoName}</td>
              ) : null}
              <td>{trip.group?.id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default TestTripTable;
