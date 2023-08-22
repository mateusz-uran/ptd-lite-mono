import '../../../css/edit_modal.css';
import { RiCloseFill } from 'react-icons/ri';
import { MdSettingsBackupRestore } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { translatedTripSingleSchema } from '../inputs/tripValidations';
import { yupResolver } from '@hookform/resolvers/yup';
import { translateTripInputs } from '../inputs/tripInputs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stopEditing } from '../slices/tripUpdateSlice';
import { createPortal } from 'react-dom';
import { useEditTripMutation } from '../../../api/trips/tripsApiSlice';
import { useTranslation } from 'react-i18next';
import { getUsername } from '../../auth/auth0Slice';

const TripEditForm = ({ tripToEdit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [editTrip] = useEditTripMutation();
  const tripInputs = translateTripInputs();
  const tripSchemaSingle = translatedTripSingleSchema();
  const username = useSelector(getUsername);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(tripSchemaSingle) });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    await editTrip({ tripId: data.id, updatedTrip: data, username });
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
          <h5>{t('misc.tripStart')}</h5>
          {tripInputs.slice(0, 5).map((input, index) => (
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
        <div className="end">
          <h5>{t('misc.tripEnd')}</h5>
          {tripInputs.slice(5).map((input, index) => (
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
        <div className="button-wrapper">
          <button
            type="button"
            onClick={() => reset()}
            className="small-btn clear"
          >
            <MdSettingsBackupRestore className="icon" /> {t('buttons.clear')}
          </button>
          <button
            type="button"
            onClick={() => dispatch(stopEditing())}
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
      <div className="modal-wrapper">
        <div className="modal-header">
          <h5>{t('misc.editTripHeader')}</h5>
          <div className="exit-button-wrapper">
            <button
              type="button"
              onClick={() => dispatch(stopEditing())}
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
export default TripEditForm;
