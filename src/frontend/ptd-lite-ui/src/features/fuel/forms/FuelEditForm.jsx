import '../../../css/edit_modal.css';
import { MdSettingsBackupRestore } from 'react-icons/md';
import { RiCloseFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { editType, fuelToEdit, stopEditingFuel } from '../slices/fuelEditSlice';
import {
  translatedAdBlueSingleSchema,
  translatedPetrolSingleSchema,
} from '../inputs/fuelValidations';
import {
  translateAdBlueInputs,
  translatePetrolInputs,
} from '../inputs/fuelInputs';
import { useUpdatePetrolMutation } from '../../../api/petrol/petrolApiSlice';
import { useUpdateAdBlueMutation } from '../../../api/adblue/adBlueApiSlice';
import { useTranslation } from 'react-i18next';

const FuelEditForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalType = useSelector(editType);
  const objectToEdit = useSelector(fuelToEdit);
  const [updatePetrol] = useUpdatePetrolMutation();
  const [updateAdBlue] = useUpdateAdBlueMutation();

  let schema;
  let inputs;
  let translatedModalType;

  if (modalType === 'petrol') {
    schema = translatedPetrolSingleSchema();
    inputs = translatePetrolInputs();
    translatedModalType = t('misc.editPetrolHeader');
  } else if (modalType === 'blue') {
    schema = translatedAdBlueSingleSchema();
    inputs = translateAdBlueInputs();
    translatedModalType = t('misc.editAdBlueHeader');
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
              <label className="primary-label" htmlFor={input.name}>
                {input.label}
              </label>
              <input
                type={input.type}
                id={input.name}
                {...register(input.name)}
                className="primary-input"
              />
              {errors[input.name] && (
                <p className="error-input">{errors[input.name].message}</p>
              )}
            </div>
          ))}
        </div>
        <div className="button-wrapper fuel-button">
          <button
            type="button"
            onClick={() => reset()}
            className="small-btn clear"
          >
            <MdSettingsBackupRestore className="icon" /> {t('buttons.clear')}
          </button>
          <button
            type="button"
            onClick={() => dispatch(stopEditingFuel())}
            className="small-btn close"
          >
            {t('buttons.close')}
          </button>
          <button className="primary-btn save">{t('buttons.submit')}</button>
        </div>
      </form>
    </div>
  );

  return createPortal(
    <div className="edit-modal">
      <div className="modal-wrapper fuel-modal">
        <div className="modal-header">
          <h5>{translatedModalType}</h5>
          <div className="exit-button-wrapper">
            <button
              type="button"
              onClick={() => dispatch(stopEditingFuel())}
              className="small-btn close-modal"
            >
              <RiCloseFill />
            </button>
          </div>
        </div>
        {modalBody}
      </div>
    </div>,
    document.body
  );
};
export default FuelEditForm;
