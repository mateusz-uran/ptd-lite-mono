import { useSelector } from 'react-redux';
import { selectedTripArray } from '../../trips/slices/tripSelectedSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { useRetrieveUserRatesQuery } from '../../../api/card/cardApiSlice';
import { useEffect, useState } from 'react';

const CalculateRates = () => {
  const { user } = useAuth0();
  const selectedTrips = useSelector(selectedTripArray);
  const [selectedCountry, setSelectedCountry] = useState('');
  const {
    data: hourRates,
    isSuccess,
    isError,
    isLoading,
  } = useRetrieveUserRatesQuery(user.nickname);

  let options;
  let mileage;
  let sumMileage = 0;
  let defaultUserHourRate;

  const onOptionChangeHandler = (event) => {
    setSelectedCountry(event.target.value);
  };

  if (isSuccess) {
    options = hourRates.rates.map((rate) => Object.keys(rate)[0]);
    mileage = selectedTrips.map((trip) => trip.carMileage);
    mileage.forEach((num) => {
      sumMileage += num;
    });
    defaultUserHourRate = hourRates.defaultRate;
    console.log(defaultUserHourRate);
  }

  useEffect(() => {}, [selectedCountry]);

  return (
    <div>
      <div className="select-wrapper">
        <select onChange={onOptionChangeHandler}>
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>
    </div>
  );
};
export default CalculateRates;
