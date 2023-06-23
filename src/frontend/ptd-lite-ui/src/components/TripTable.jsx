import '../css/trip_table.css';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Fragment, useState } from 'react';
import {
  getTripSelectors,
  useDeleteTripsMutation,
  useGetTripsByCardIdQuery,
} from '../api/trips/tripsApiSlice';
import { useSelector } from 'react-redux';
import EditForm from '../features/trips/EditForm';
const TripTable = ({ cardId }) => {
  const { isLoading, isSuccess, isError } = useGetTripsByCardIdQuery(cardId);
  const [deleteTrips] = useDeleteTripsMutation();
  const { selectAll: selectAllTripsFromCard } = getTripSelectors(cardId);
  const tripEntities = useSelector(selectAllTripsFromCard);
  const [interactiveVisible, setInteractiveVisible] = useState(
    new Array(tripEntities.length).fill(false)
  );
  const [selectedTripIds, setSelectedTripIds] = useState([]);
  let tableContent;

  const handleCheckboxChange = (event, tripId) => {
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

  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const handleEdit = (trip) => {
    setSelectedTrip(trip);
    setEditFormVisible(true);
  };

  const handleDelete = () => {
    deleteTrips(selectedTripIds).unwrap();
    setSelectedTripIds([]);
  };

  if (isSuccess && tripEntities?.length) {
    tableContent = tripEntities?.map((trip, index) => (
      <Fragment>
        <tr key={index}>
          <td>
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
          <td className="last-cell">
            <div
              className={`interactive ${
                interactiveVisible[index] ? 'show' : ''
              }`}
            >
              <button onClick={() => handleEdit(trip)}>
                <AiOutlineEdit className="edit" />
              </button>
            </div>
            <button
              className="dots"
              onClick={() => toggleInteractiveVisible(index)}
            >
              <BsThreeDotsVertical className="dots-horizontal" />
            </button>
          </td>
        </tr>
        {editFormVisible && selectedTrip?.id === trip.id && (
          <EditForm trip={selectedTrip} />
        )}
      </Fragment>
    ));
  }

  return (
    <div className="trip-table">
      <table>
        <thead>
          <tr>
            <th className="icon-wrapper">
              <button
                onClick={handleDelete}
                disabled={selectedTripIds.length === 0}
              >
                <MdDeleteOutline className="icon" />
              </button>
            </th>
            <th colSpan={5}>Start</th>
            <th colSpan={5}>End</th>
            <th></th>
          </tr>
          <tr>
            <th></th>
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
            <th></th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
};
export default TripTable;
