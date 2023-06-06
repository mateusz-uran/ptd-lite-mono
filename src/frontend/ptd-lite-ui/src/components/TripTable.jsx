import React from 'react';
import { Link } from 'react-router-dom';

const TripTable = ({ trips }) => {
  const shouldRenderMinimumRows = trips.length < 5;
  const emptyRowCount = shouldRenderMinimumRows ? 5 - trips.length : 0;

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
        {trips.map((trip, index) => (
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
        ))}

        {emptyRowCount > 0 && (
          <tr className="empty-row">
            <td colSpan={10} style={{ height: `${emptyRowCount * 25}px` }}>
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
      </tbody>
    </table>
  );
};

export default TripTable;
