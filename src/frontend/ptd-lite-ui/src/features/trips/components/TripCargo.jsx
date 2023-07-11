import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSelectedTrips,
  selectedTripArray,
} from '../slices/tripSelectedSlice';
import {
  useAddTripToExistingGroupMutation,
  useDeleteTripGroupMutation,
  useRemoveTripFromGroupMutation,
} from '../../../api/trips/tripsApiSlice';
import {
  cargoToEdit,
  editCargoFormStatus,
  startEditingCargo,
} from '../slices/tripCargoUpdateSlice';
import TripEditCargoModal from '../forms/TripEditCargoModal';

const TripCargo = ({ group }) => {
  const dispatch = useDispatch();
  const selectedTrips = useSelector(selectedTripArray);
  const isEditingCargo = useSelector(editCargoFormStatus);
  const cargoInfoToEdit = useSelector(cargoToEdit);
  const [addTripToExistingGroup] = useAddTripToExistingGroupMutation();
  const [removeTripFromGroup] = useRemoveTripFromGroupMutation();
  const [deleteTripGroup] = useDeleteTripGroupMutation();

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

  const handleDeleteTripGroup = async (groupId) => {
    try {
      await deleteTripGroup(groupId).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="cargo">
        <div className="cargo-wrapper">
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
          </div>
        </div>
        <div className="group-buttons-wrapper">
          <button
            className="small-btn"
            onClick={() => dispatch(startEditingCargo(group))}
          >
            <AiOutlineEdit />
          </button>
          <button
            className="small-btn"
            onClick={() => handleDeleteTripGroup(group.id)}
          >
            <MdDeleteOutline />
          </button>
        </div>
      </div>
      {isEditingCargo && cargoInfoToEdit.id === group.id && (
        <TripEditCargoModal groupToEdit={group} />
      )}
    </Fragment>
  );
};
export default TripCargo;
