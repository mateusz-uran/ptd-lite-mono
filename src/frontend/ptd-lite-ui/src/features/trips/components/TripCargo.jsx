import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSelectedTrips,
  selectedTripArray,
} from '../slices/tripSelectedSlice';
import {
  useAddTripToExistingGroupMutation,
  useRemoveTripFromGroupMutation,
} from '../../../api/trips/tripsApiSlice';

const TripCargo = ({ group }) => {
  const dispatch = useDispatch();
  const selectedTrips = useSelector(selectedTripArray);
  const [addTripToExistingGroup] = useAddTripToExistingGroupMutation();
  const [removeTripFromGroup] = useRemoveTripFromGroupMutation();

  const tripHasGroup = selectedTrips.some((trip) => trip.group);
  const tripHasNotGroup = selectedTrips.some((trip) => !trip.group);
  const selectedTripGroupIdMatch = selectedTrips.some(
    (trip) => trip.group?.id === group.id
  );

  const handleAddTripToGroup = async () => {
    const selectedTripIds = selectedTrips.map((trip) => trip.id);
    let tripGroupPayload = {
      tripIds: selectedTripIds,
      groupId: group.id,
    };
    await addTripToExistingGroup(tripGroupPayload).unwrap();
    dispatch(clearSelectedTrips());
  };

  const handleRemoveTripFromGroup = async () => {
    const selectedTripIds = selectedTrips.map((trip) => trip.id);
    let tripGroupPayload = {
      tripIds: selectedTripIds,
      groupId: group.id,
    };
    await removeTripFromGroup(tripGroupPayload).unwrap();
    dispatch(clearSelectedTrips());
  };

  return (
    <Fragment>
      <div className="cargo">
        <div className="cargo-info">
          {group?.cargoName && <span>{group.cargoName}</span>}
          {group?.weight && <span>{group.weight}t</span>}
          {group?.temperature && <span>{group.temperature}°C</span>}
          {group?.notes && <span>{group.notes}</span>}
        </div>
        <div className="cargo-buttons">
          <button
            className="small-btn"
            disabled={selectedTrips.length <= 0 || tripHasGroup}
            onClick={() => handleAddTripToGroup()}
          >
            add
          </button>
          <button
            className="small-btn"
            disabled={
              selectedTrips.length <= 0 ||
              tripHasNotGroup ||
              !selectedTripGroupIdMatch
            }
            onClick={() => handleRemoveTripFromGroup()}
          >
            remove
          </button>
          <button className="small-btn">delete</button>
        </div>
      </div>
    </Fragment>
  );
};
export default TripCargo;
