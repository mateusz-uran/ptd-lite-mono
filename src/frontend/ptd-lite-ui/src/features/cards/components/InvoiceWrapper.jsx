import '../../../css/invoice_wrapper.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectedTripArray } from '../../trips/slices/tripSelectedSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { useRetrieveUserRatesQuery } from '../../../api/card/cardApiSlice';
import { useEffect, useState } from 'react';
import { format, subDays } from 'date-fns';
import CurrencyCard from '../../../components/CurrencyCard';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import SelectedTripsTable from '../../trips/components/SelectedTripsTable';
import { refetchCurrency } from '../../../api/currency/currencyApiSlice';
import Invoice from './Invoice';

const InvoiceWrapper = () => {
  const { t } = useTranslation();
  var detectLocale = navigator.language;
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const selectedTrips = useSelector(selectedTripArray);
  const [selectedCountry, setSelectedCountry] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');

  const {
    data: hourRates,
    isSuccess,
    isError,
    isLoading,
  } = useRetrieveUserRatesQuery(user.nickname);

  let selectedRateCountry;
  let mileage;
  let selectedTripsMileageSummary = 0;
  let defaultUserHourRate;

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  if (isSuccess) {
    selectedRateCountry = hourRates.rates.find(
      (rate) => Object.keys(rate)[0] === selectedCountry
    );
    defaultUserHourRate = hourRates.defaultRate;
  }

  mileage = selectedTrips.map((trip) => trip.carMileage);
  mileage.forEach((num) => {
    selectedTripsMileageSummary += num;
  });

  const handleDateChange = (date) => {
    setStartDate(date);
    dispatch(refetchCurrency());
  };

  useEffect(() => {}, [selectedCountry]);

  return (
    <div className="invoice-wrapper">
      <SelectedTripsTable trips={selectedTrips} />
      <div className="wrapper-container">
        <div className="currency-wrapper">
          <DatePicker
            selected={startDate}
            dateFormat="yyyy/MM/dd"
            onChange={(date) => handleDateChange(date)}
            maxDate={new Date()}
            locale={detectLocale}
            className="currency-date primary-input"
          />
          <CurrencyCard date={formattedStartDate} />
        </div>
        <div className="select-wrapper">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="primary-input"
          >
            <option value="">Select a country</option>
            {hourRates?.rates.map((rate, index) => {
              const country = Object.keys(rate)[0];
              return (
                <option key={index} value={country}>
                  {country}
                </option>
              );
            })}
          </select>
          <Invoice
            sumMileage={selectedTripsMileageSummary}
            defaultRate={defaultUserHourRate}
            selectedRate={selectedRateCountry}
          />
        </div>
      </div>
    </div>
  );
};
export default InvoiceWrapper;
