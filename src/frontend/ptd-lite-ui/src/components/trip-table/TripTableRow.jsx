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
import { fakeTrips } from '../../features/trips/tripDummyData';

const TripTableRow = ({
  // tripEntities,
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

  let tripDummyEntities = fakeTrips;

  const getRowSpan = (index) => {
    let rowspan = 1;
    const currentGroup = tripDummyEntities[index]?.group?.id;
    const nextGroup = tripDummyEntities[index + 1]?.group?.id;

    if (currentGroup && currentGroup === nextGroup) {
      rowspan = getRowSpan(index + 1) + 1;
    }

    return rowspan;
  };

  return tripDummyEntities?.map((trip, index) => (
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
        {index === 0 ||
        trip.group?.id !== tripDummyEntities[index - 1]?.group?.id ? (
          <td rowSpan={getRowSpan(index)} className="row-span-cell">
            {trip.group?.cargoName}
          </td>
        ) : null}
      </tr>
      {isEditing && selectTripToEdit.id === trip.id && (
        <TripEditForm tripToEdit={selectTripToEdit} />
      )}
    </Fragment>
  ));
};
export default TripTableRow;
