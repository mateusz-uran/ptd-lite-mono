import '../../../css/tables.css';
import { MdDeleteOutline } from 'react-icons/md';
import {
  getTripSelectors,
  useDeleteTripsMutation,
  useGetTripsByCardIdQuery,
} from '../../../api/trips/tripsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingDots from '../../../components/LoadingDots';
import TripTableBody from './TripTableBody';
import { useTranslation } from 'react-i18next';
import {
  clearSelectedTrips,
  selectedTripArray,
} from '../slices/tripSelectedSlice';
import { toast } from 'react-toastify';
import { getUsername } from '../../auth/auth0Slice';

const TripTable = ({ cardId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } =
    useGetTripsByCardIdQuery(cardId);
  const [deleteTrips] = useDeleteTripsMutation();
  const { selectAll: selectAllTripsFromCard } = getTripSelectors(cardId);
  const tripEntities = useSelector(selectAllTripsFromCard);
  const selectedTrips = useSelector(selectedTripArray);
  const nickname = useSelector(getUsername);

  const handleDelete = async () => {
    try {
      const selectedTripIds = selectedTrips.map((trip) => trip.id);
      await deleteTrips({ selectedTripIds, nickname }).unwrap();
      dispatch(clearSelectedTrips());
      toast.info(t('toastify.deletedSuccesfully'));
    } catch (err) {
      toast.error(t('toastify.failDelete'));
      console.log('Cant delete those trips: ', err);
    }
  };

  let tableContent;
  if (isLoading) {
    tableContent = (
      <tr>
        <td colSpan={13}>
          <LoadingDots />
        </td>
      </tr>
    );
  } else if (isSuccess && tripEntities?.length) {
    tableContent = <TripTableBody tripEntities={tripEntities} />;
  } else if (isError && error.data?.statusCode === 404) {
    tableContent = (
      <tr>
        <td colSpan={13}>
          <span className="empty-response">{t('misc.tripTableEmpty')}</span>
        </td>
      </tr>
    );
  } else if (isError && error.data === undefined) {
    tableContent = (
      <tr>
        <td colSpan={13}>
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
                disabled={selectedTrips.length === 0}
              >
                <MdDeleteOutline className="icon" />
              </button>
            </th>
            <th colSpan={5}>{t('misc.tripStart')}</th>
            <th colSpan={5}>{t('misc.tripEnd')}</th>
            <th className="manage-cell"></th>
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
            <th className="manage-cell"></th>
            <th colSpan={2}>
              {t('misc.cargo')} / {t('misc.weight')} / {t('misc.notes')}
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
};
export default TripTable;
