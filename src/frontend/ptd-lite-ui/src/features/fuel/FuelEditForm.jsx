import '../../css/edit_modal.css';
import { MdSettingsBackupRestore } from 'react-icons/md';
import { RiCloseFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { editType, fuelToEdit, stopEditingFuel } from './fuelEditSlice';
import { adBlueSchema, petrolSchema } from './fuelValidations';
import { blueInputs, petrolInputs } from './fuelInputs';
import { useUpdatePetrolMutation } from '../../api/petrol/petrolApiSlice';
import { useUpdateAdBlueMutation } from '../../api/adblue/adBlueApiSlice';

const FuelEditForm = () => {
  const dispatch = useDispatch();
  const modalType = useSelector(editType);
  const objectToEdit = useSelector(fuelToEdit);
  const [updatePetrol] = useUpdatePetrolMutation();
  const [updateAdBlue] = useUpdateAdBlueMutation();

  let schema;
  let inputs;

  if (modalType === 'petrol') {
    schema = petrolSchema;
    inputs = petrolInputs;
  } else if (modalType === 'blue') {
    schema = adBlueSchema;
    inputs = blueInputs;
  }

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    let fuelPayload = {};

    if (modalType === 'petrol') {
      fuelPayload = {
        fuelId: data.id,
        petrol: data,
      };
      await updatePetrol(fuelPayload).unwrap();
    } else if (modalType === 'blue') {
      fuelPayload = {
        blueId: data.id,
        blue: data,
      };
      await updateAdBlue(fuelPayload).unwrap();
    }
    dispatch(stopEditingFuel());
  };

  useEffect(() => {
    if (objectToEdit) {
      Object.keys(objectToEdit).forEach((fieldName) => {
        setValue(fieldName, objectToEdit[fieldName]);
      });
    }
  }, []);

  var modalBody = (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="fuel">
        <div className="input-wrapper">
          {inputs.map((input, index) => (
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
        <div className="button-wrapper fuel-button">
          <button type="button" onClick={() => reset()}>
            <MdSettingsBackupRestore className="icon" /> Clear
          </button>
          <button type="button" onClick={() => dispatch(stopEditingFuel())}>
            Close
          </button>
          <button className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );

  return createPortal(
    <div className="edit-modal">
      <div className="modal-wrapper fuel-modal">
        <div className="modal-header">
          <h5>Edit {modalType}</h5>
          <button type="button" onClick={() => dispatch(stopEditingFuel())}>
            <RiCloseFill />
          </button>
        </div>
        {modalBody}
      </div>
    </div>,
    document.body
  );
};
export default FuelEditForm;
