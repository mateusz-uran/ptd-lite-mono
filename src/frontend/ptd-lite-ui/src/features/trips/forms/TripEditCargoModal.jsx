import '../../../css/edit_modal.css';
import { RiCloseFill } from 'react-icons/ri';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { stopEditingCargo } from '../slices/tripCargoUpdateSlice';
import { useForm } from 'react-hook-form';
import { translateCargoInputs } from '../inputs/cargoInputs';
import { useEffect } from 'react';
import { useUpdateTripGroupInformationMutation } from '../../../api/trips/tripsApiSlice';

const TripEditCargoModal = ({ groupToEdit }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const inputs = translateCargoInputs();
  const [updateTripGroupInformation] = useUpdateTripGroupInformationMutation();

  const onSubmit = async (data) => {
    let payload = {
      groupId: data.id,
      request: data,
    };
    await updateTripGroupInformation(payload).unwrap();
    dispatch(stopEditingCargo());
  };

  useEffect(() => {
    if (groupToEdit) {
      Object.keys(groupToEdit).forEach((fieldName) => {
        setValue(fieldName, groupToEdit[fieldName]);
      });
    }
  }, []);

  const formBody = (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputs.map((input, index) => (
        <div key={index}>
          <label htmlFor={input.name} className="primary-label">
            {input.label}
          </label>
          <input
            type={input.type}
            name={input.name}
            {...register(input.name)}
            className="primary-input"
          />
        </div>
      ))}
      <button className="primary-btn">Update cargo</button>
    </form>
  );

  return createPortal(
    <div className="edit-modal cargo">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h5>Edit cargo information</h5>
          <button
            type="button"
            onClick={() => dispatch(stopEditingCargo())}
            className="small-btn close-modal"
          >
            <RiCloseFill />
          </button>
        </div>
        {formBody}
      </div>
    </div>,
    document.body
  );
};
export default TripEditCargoModal;
