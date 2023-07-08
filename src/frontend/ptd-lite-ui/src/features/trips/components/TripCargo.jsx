import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedTripArray } from '../slices/tripSelectedSlice';

const TripCargo = ({ group }) => {
  const selectedTrips = useSelector(selectedTripArray);

  const isAddButtonDisabled = selectedTrips.some(
    (trip) => trip.group && trip.group.id !== group.id
  );
  const isRemoveButtonDisabled = selectedTrips.some(
    (trip) => !trip.group || trip.group.id !== group.id
  );
  return (
    <Fragment>
      <div className="cargo">
        <div className="cargo-info">
          {group?.tripIds && <span>{`${group.tripIds};`}</span>}
          {group?.cargoName && <span>{group.cargoName}</span>}
          {group?.weight && <span>{group.weight}t</span>}
          {group?.temperature && <span>{group.temperature}°C</span>}
          {group?.notes && <span>{group.notes}</span>}
        </div>
        <div className="cargo-buttons">
          <button className="primary-btn">Edit</button>
          <div className="buttons-wrapper">
            <button className="small-btn" disabled={isAddButtonDisabled}>
              add
            </button>
            <button className="small-btn" disabled={isRemoveButtonDisabled}>
              remove
            </button>
            <button className="small-btn">delete</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default TripCargo;
