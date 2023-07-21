import { useTranslation } from 'react-i18next';

const SelectedTripsTable = ({ trips }) => {
  const { t } = useTranslation();
  return (
    <>
      <h4 className="selected-trips-h">{t('misc.cargoFormHead')}</h4>
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
          {trips.map((trip, index) => (
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
    </>
  );
};
export default SelectedTripsTable;
