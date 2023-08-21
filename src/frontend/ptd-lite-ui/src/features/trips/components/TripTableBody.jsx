import { AiOutlineEdit } from 'react-icons/ai';
import { Fragment } from 'react';
import TripSingleSelect from './TripSingleSelect';
import TripEditForm from '../forms/TripEditForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  editFormStatus,
  startEditing,
  stopEditing,
  tripToEdit,
} from '../slices/tripUpdateSlice';
import TripCargo from './TripCargo';

const TripTableBody = ({ tripEntities }) => {
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

  const getRowSpan = (index) => {
    let rowspan = 1;
    const currentGroup = tripEntities[index]?.group?.id;

    for (let i = index - 1; i >= 0; i--) {
      const prevGroup = tripEntities[i]?.group?.id;
      if (currentGroup && currentGroup === prevGroup) {
        rowspan++;
      } else {
        break;
      }
    }

    for (let i = index + 1; i < tripEntities.length; i++) {
      const nextGroup = tripEntities[i]?.group?.id;
      if (currentGroup && currentGroup === nextGroup) {
        rowspan++;
      } else {
        break;
      }
    }

    return rowspan;
  };

  return tripEntities?.map((trip, index) => (
    <Fragment key={index}>
      <tr>
        <td>
          <TripSingleSelect tripObject={trip} />
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
        <td className="manage-cell-wrapper">
          <div className="manage-cell">
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
        trip.group?.id !== tripEntities[index - 1]?.group?.id ||
        trip.group === null ? (
          <td rowSpan={getRowSpan(index)} className="cargo-cell-wrapper">
            {trip.group && <TripCargo group={trip.group} />}
          </td>
        ) : null}
      </tr>
      {isEditing && selectTripToEdit.id === trip.id && (
        <TripEditForm tripToEdit={selectTripToEdit} />
      )}
    </Fragment>
  ));
};
export default TripTableBody;
