import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import {
  clearSelectedTrips,
  selectedTripArray,
} from '../slices/tripSelectedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { translateCargoInputs } from '../inputs/cargoInputs';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import { useCreateTripsGroupMutation } from '../../../api/trips/tripsApiSlice';

const TripCargoForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cardNumber } = useParams();
  const selectedTrips = useSelector(selectedTripArray);
  const inputs = translateCargoInputs();

  const [createTripsGroup] = useCreateTripsGroupMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const selectedTripIds = selectedTrips.map((trip) => trip.id);
      let tripGroupPayload = {
        ...data,
        tripIds: selectedTripIds,
      };
      await createTripsGroup(tripGroupPayload).unwrap();
      dispatch(clearSelectedTrips());
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <Header
        compArray={[
          {
            compName: t('misc.cards'),
          },
          {
            compName: cardNumber,
          },
        ]}
      />
      <h4 className="cargo-form-h">{t('misc.cargoFormHead')}</h4>
      <table>
        <thead>
          <tr>
            <th colSpan={5}>{t('misc.tripStart')}</th>
            <th colSpan={5}>{t('misc.tripEnd')}</th>
          </tr>
          <tr>
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
          </tr>
        </thead>
        <tbody>
          {selectedTrips.map((trip, index) => (
            <tr key={index}>
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
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cargo-input-wrapper">
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
          <button className="primary-btn">{t('buttons.addCargo')}</button>
        </form>
      </div>
    </Fragment>
  );
};
export default TripCargoForm;
