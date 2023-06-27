import { AiOutlineEdit } from 'react-icons/ai';
import { Fragment } from 'react';
import TripSingleSelect from '../../features/trips/TripSingleSelect';
import TripEditForm from '../../features/trips/TripEditForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  editFormStatus,
  startEditing,
  stopEditing,
  tripToEdit,
} from '../../features/trips/tripUpdateSlice';

const TripTableRow = ({
  tripEntities,
  selectedTripIds,
  setSelectedTripIds,
}) => {
  const dispatch = useDispatch();
  const selectTripToEdit = useSelector(tripToEdit);
  const isEditing = useSelector(editFormStatus);

  const handleEditTrip = (trip) => {
    if (selectTripToEdit && selectTripToEdit.id === trip.id) {
      dispatch(stopEditing());
    } else {
      dispatch(startEditing(trip));
    }
  };

  return tripEntities?.map((trip, index) => (
    <Fragment key={index}>
      <tr>
        <td>
          <TripSingleSelect
            tripId={trip.id}
            selectedTripIds={selectedTripIds}
            setSelectedTripIds={setSelectedTripIds}
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
        <td className="last-cell">
          <div>
            <button
              type="button"
              onClick={() => handleEditTrip(trip)}
              className="small-btn"
            >
              <AiOutlineEdit className="edit" />
            </button>
          </div>
        </td>
      </tr>
      {isEditing && selectTripToEdit.id === trip.id && (
        <TripEditForm tripToEdit={selectTripToEdit} />
      )}
    </Fragment>
  ));
};
export default TripTableRow;
