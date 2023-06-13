import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getTripSelectors,
  useGetTripsByCardIdQuery,
} from '../features/trip/tripApiSlice';
import { useSelector } from 'react-redux';

const TripTable = ({ cardId }) => {
  const { isLoading, isSuccess, isError } = useGetTripsByCardIdQuery(cardId);

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

  if (isSuccess && tripEntities?.length) {
    shouldRenderMinimumRows = 0;
    shouldRenderMinimumRows = tripEntities.length < 5;
    emptyRowCount = 0;
    emptyRowCount = shouldRenderMinimumRows ? 5 - tripEntities.length : 0;

    tableContent = tripEntities?.map((trip, index) => (
      <tr key={index}>
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
          <th colSpan={5}>Start</th>
          <th colSpan={5}>End</th>
        </tr>
        <tr>
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

        {emptyRowCount > 0 && (
          <tr className="empty-row">
            <td colSpan={10} style={{ height: `${emptyRowCount * 25}px` }}>
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
