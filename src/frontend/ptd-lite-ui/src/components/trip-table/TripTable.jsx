import '../../css/tables.css';
import { MdDeleteOutline } from 'react-icons/md';
import { useState } from 'react';
import {
  getTripSelectors,
  useDeleteTripsMutation,
  useGetTripsByCardIdQuery,
} from '../../api/trips/tripsApiSlice';
import { useSelector } from 'react-redux';
import LoadingDots from '../LoadingDots';
import TripTableRow from './TripTableRow';
const TripTable = ({ cardId }) => {
  const { isLoading, isSuccess, isError, error } =
    useGetTripsByCardIdQuery(cardId);
  const [deleteTrips] = useDeleteTripsMutation();
  const { selectAll: selectAllTripsFromCard } = getTripSelectors(cardId);
  const tripEntities = useSelector(selectAllTripsFromCard);

  const [selectedTripIds, setSelectedTripIds] = useState([]);
  let tableContent;

  const handleDelete = () => {
    deleteTrips(selectedTripIds).unwrap();
    setSelectedTripIds([]);
  };

  if (isLoading) {
    tableContent = (
      <tr>
        <td colSpan={12}>
          <LoadingDots />
        </td>
      </tr>
    );
  }

  if (isSuccess && tripEntities?.length) {
    tableContent = (
      <TripTableRow
        tripEntities={tripEntities}
        selectedTripIds={selectedTripIds}
        setSelectedTripIds={setSelectedTripIds}
      />
    );
  }

  if (isError && error.data?.statusCode === 404) {
    tableContent = (
      <tr>
        <td colSpan={12}>
          <span className="empty-response">{error.data?.description}</span>
        </td>
      </tr>
    );
  }

  if (isError && error.data === undefined) {
    tableContent = (
      <tr>
        <td colSpan={12}>
          <span className="empty-response">
            Server is not available at the moment, try again later.
          </span>
        </td>
      </tr>
    );
  }

  return (
    <div className="trip-table">
      <table>
        <thead>
          <tr>
            <th className="icon-wrapper">
              <button
                className="small-btn delete-trip"
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
