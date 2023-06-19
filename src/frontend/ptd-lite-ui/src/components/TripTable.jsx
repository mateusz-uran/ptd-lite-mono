import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getTripSelectors,
  useDeleteTripsMutation,
  useGetTripsByCardIdQuery,
} from '../features/trip/tripApiSlice';
import { useSelector } from 'react-redux';

const TripTable = ({ cardId }) => {
  const { isLoading, isSuccess, isError } = useGetTripsByCardIdQuery(cardId);
  const [deleteTrips] = useDeleteTripsMutation();

  const { selectAll: selectAllTripsFromCard } = getTripSelectors(cardId);

  const tripEntities = useSelector(selectAllTripsFromCard);

  let tableContent;
  let defaultResponse;

  let shouldRenderMinimumRows = 5;
  let emptyRowCount = 5;

  if (isLoading) {
    defaultResponse = <p>Loading data...</p>;
  }

  if (isError) {
    defaultResponse = <p>No data to display</p>;
  }

  const [selectedTripIds, setSelectedTripIds] = useState([]);

  const handleCheckboxChange = (event, tripId) => {
    const isChecked = event.target.checked; // Check if the checkbox is checked or not
    if (isChecked) {
      // Add the trip ID to the selectedTripIds array
      setSelectedTripIds((prevSelectedTripIds) => [
        ...prevSelectedTripIds,
        tripId,
      ]);
    } else {
      // Remove the trip ID from the selectedTripIds array
      setSelectedTripIds((prevSelectedTripIds) =>
        prevSelectedTripIds.filter((id) => id !== tripId)
      );
    }
  };

  const handleDelete = () => {
    deleteTrips(selectedTripIds).unwrap();
    setSelectedTripIds([]);
  };

  if (isSuccess && tripEntities?.length) {
    shouldRenderMinimumRows = 0;
    shouldRenderMinimumRows = tripEntities.length < 5;
    emptyRowCount = 0;
    emptyRowCount = shouldRenderMinimumRows ? 5 - tripEntities.length : 0;

    tableContent = tripEntities?.map((trip, index) => (
      <tr key={index}>
        <td className="select">
          <input
            type="checkbox"
            value={trip.id}
            onChange={(event) => handleCheckboxChange(event, trip.id)}
          />
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
      </tr>
    ));
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th colSpan={5}>Start</th>
          <th colSpan={5}>End</th>
        </tr>
        <tr>
          <th>
            <button
              onClick={handleDelete}
              disabled={selectedTripIds.length === 0}
              className="delete-trip"
            >
              <i className="bx bxs-trash-alt"></i>
            </button>
          </th>
          <th>Day</th>
          <th>Hour</th>
          <th>Location</th>
          <th>Country</th>
          <th>Counter</th>
          <th>Day</th>
          <th>Hour</th>
          <th>Location</th>
          <th>Country</th>
          <th>Counter</th>
        </tr>
      </thead>
      <tbody>
        {tableContent}
        {emptyRowCount === 0 && (
          <tr className="empty-row">
            <td colSpan={11}>
              <div className="empty-row-button">
                <Link to={'addtrip'}>
                  <button>
                    <span className="text">Add</span>
                    <i className="bx bx-message-square-add icon"></i>
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        )}
        {emptyRowCount > 0 && (
          <tr className="empty-row">
            <td colSpan={11} style={{ height: `${emptyRowCount * 25}px` }}>
              <div className="empty-row-button">
                {defaultResponse}
                <Link to={'addtrip'}>
                  <button>
                    <span className="text">Add</span>
                    <i className="bx bx-message-square-add icon"></i>
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TripTable;
