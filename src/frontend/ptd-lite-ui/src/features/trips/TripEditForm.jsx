import '../../css/edit_modal.css';
import { RiCloseFill } from 'react-icons/ri';
import { MdSettingsBackupRestore } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { tripSchemaSingle } from './tripValidations';
import { yupResolver } from '@hookform/resolvers/yup';
import tripInputs from './tripInputs';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { stopEditing } from './tripUpdateSlice';
import { createPortal } from 'react-dom';
import { useEditTripMutation } from '../../api/trips/tripsApiSlice';

const TripEditForm = ({ tripToEdit }) => {
  const dispatch = useDispatch();
  const [editTrip] = useEditTripMutation();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(tripSchemaSingle) });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);
    let tripPayload = {
      tripId: data.id,
      updatedTrip: data,
    };
    await editTrip(tripPayload);
    dispatch(stopEditing());
  };

  useEffect(() => {
    if (tripToEdit) {
      Object.keys(tripToEdit).forEach((fieldName) => {
        setValue(fieldName, tripToEdit[fieldName]);
      });
    }
  }, []);

  var modalBody = (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="start">
          <h5>Start</h5>
          {tripInputs.slice(0, 5).map((input, index) => (
            <div key={index} className="single-input">
              <label htmlFor={input.name}>{input.label}</label>
              <input
                type={input.type}
                id={input.name}
                {...register(input.name)}
              />
              {errors[input.name] && <p>{errors[input.name].message}</p>}
            </div>
          ))}
        </div>
        <div className="end">
          <h5>End</h5>
          {tripInputs.slice(5).map((input, index) => (
            <div key={index} className="single-input">
              <label htmlFor={input.name}>{input.label}</label>
              <input
                type={input.type}
                id={input.name}
                {...register(input.name)}
              />
              {errors[input.name] && <p>{errors[input.name].message}</p>}
            </div>
          ))}
        </div>
        <div className="button-wrapper">
          <button type="button" onClick={() => reset()}>
            <MdSettingsBackupRestore className="icon" /> Clear
          </button>
          <button type="button" onClick={() => dispatch(stopEditing())}>
            Close
          </button>
          <button className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );

  return createPortal(
    <div className="edit-modal">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h5>Edit trip</h5>
          <button type="button" onClick={() => dispatch(stopEditing())}>
            <RiCloseFill />
          </button>
        </div>
        {modalBody}
      </div>
    </div>,
    document.body
  );
};
export default TripEditForm;
