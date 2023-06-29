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
import { useTranslation } from 'react-i18next';
const TripTable = ({ cardId }) => {
  const { t } = useTranslation();
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
          <span className="empty-response">{t('misc.tripTableEmpty')}</span>
        </td>
      </tr>
    );
  }

  if (isError && error.data === undefined) {
    tableContent = (
      <tr>
        <td colSpan={12}>
          <span className="empty-response">{t('misc.errorMessage')}.</span>
        </td>
      </tr>
    );
  }

  return (
    <div className="trip-table">
      <h3>{t('misc.tripHead')}</h3>
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
            <th colSpan={5}>{t('misc.tripStart')}</th>
            <th colSpan={5}>{t('misc.tripEnd')}</th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th>{t('tripInputs.day')}</th>
            <th>{t('tripInputs.hour')}</th>
            <th>{t('tripInputs.location')}</th>
            <th>{t('tripInputs.country')}</th>
            <th>{t('tripInputs.counter')}</th>
            <th>{t('tripInputs.day')}</th>
            <th>{t('tripInputs.hour')}</th>
            <th>{t('tripInputs.location')}</th>
            <th>{t('tripInputs.country')}</th>
            <th>{t('tripInputs.counter')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
};
export default TripTable;
