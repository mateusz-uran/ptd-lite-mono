const TripSingleSelect = ({ tripId, selectedTripIds, setSelectedTripIds }) => {
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedTripIds((prevSelectedTripIds) => [
        ...prevSelectedTripIds,
        tripId,
      ]);
    } else {
      setSelectedTripIds((prevSelectedTripIds) =>
        prevSelectedTripIds.filter((id) => id !== tripId)
      );
    }
  };

  const isChecked = selectedTripIds.includes(tripId);

  return (
    <input
      type="checkbox"
      value={tripId}
      checked={isChecked}
      onChange={(event) => handleCheckboxChange(event)}
    />
  );
};
export default TripSingleSelect;
