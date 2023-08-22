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
import { useTranslation } from 'react-i18next';
import { openModal } from '../../modal/slices/modalSlice';
import { toast } from 'react-toastify';

const TripCargo = ({ group }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedTrips = useSelector(selectedTripArray);
  const isEditingCargo = useSelector(editCargoFormStatus);
  const cargoInfoToEdit = useSelector(cargoToEdit);
  const [addTripToExistingGroup] = useAddTripToExistingGroupMutation();
  const [removeTripFromGroup] = useRemoveTripFromGroupMutation();

  const tripHasGroup = selectedTrips.some((trip) => trip.group);
  const tripHasNotGroup = selectedTrips.some((trip) => !trip.group);
  const selectedTripGroupIdMatch = selectedTrips.some(
    (trip) => trip.group?.id === group.id
  );

  const handleAddTripToGroup = async () => {
    try {
      const selectedTripIds = selectedTrips.map((trip) => trip.id);
      await addTripToExistingGroup({
        tripIds: selectedTripIds,
        groupId: group.id,
      }).unwrap();
      dispatch(clearSelectedTrips());
      toast.success(t('toasitfy.cargoAddSuccess'));
    } catch (err) {
      console.log('Cant add trip to cargo: ', err);
      toast.error(t('toastify.cargoAddFail'));
    }
  };

  const handleRemoveTripFromGroup = async () => {
    try {
      const selectedTripIds = selectedTrips.map((trip) => trip.id);
      await removeTripFromGroup({
        tripIds: selectedTripIds,
        groupId: group.id,
      }).unwrap();
      dispatch(clearSelectedTrips());
      toast.info(t('toastify.cargoRemoveSuccess'));
    } catch (err) {
      console.log('Cannot remove this trip from cargo: ', err);
      toast.error(t('toastify.cargoRemoveFail'));
    }
  };

  const handleDeleteTripGroup = (groupId) => {
    try {
      let tripGroupDeletePayload = {
        objectId: groupId,
        message: t('misc.modalMessage'),
        method: 'deleteTripGroup',
      };
      dispatch(openModal(tripGroupDeletePayload));
    } catch (err) {
      console.log('Cannot delete this cargo: ', err);
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
              {t('buttons.add')}
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
              {t('buttons.remove')}
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
