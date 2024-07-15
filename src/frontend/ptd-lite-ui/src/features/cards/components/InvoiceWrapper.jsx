import "../../../css/invoice_wrapper.css";
import { useDispatch, useSelector } from "react-redux";
import { selectedTripArray } from "../../trips/slices/tripSelectedSlice";
import { useRetrieveUserRatesQuery } from "../../../api/card/cardApiSlice";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import CurrencyCard from "./CurrencyCard";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import SelectedTripsTable from "../../trips/components/SelectedTripsTable";
import { refetchCurrency } from "../../../api/currency/currencyApiSlice";
import Invoice from "./Invoice";
import LoadingDots from "../../../components/LoadingDots";

const InvoiceWrapper = () => {
  const { t } = useTranslation();
  var detectLocale = navigator.language;
  const dispatch = useDispatch();
  const selectedTrips = useSelector(selectedTripArray);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const formattedStartDate = format(startDate, "yyyy-MM-dd");

  //TODO: read nickname from localstorage
  const nickname = "John Doe";
  const {
    data: hourRates,
    isSuccess,
    isLoading,
  } = useRetrieveUserRatesQuery(nickname);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    dispatch(refetchCurrency());
  };

  const countryRate = (userRates, country) => {
    let ratePerCountry = userRates.rates.find(
      (rate) => Object.keys(rate)[0] === country
    );
    return ratePerCountry;
  };

  const defaultRate = (userRates) => {
    return userRates.defaultRate;
  };

  const sumSelectedTripsMileage = () => {
    let sum = 0;
    selectedTrips
      .map((trip) => trip.carMileage)
      .forEach((num) => {
        sum += num;
      });
    return sum;
  };

  const invoiceComponent = (
    <div className="select-wrapper">
      {isLoading ? (
        <div className="invoice-values loading">
          <LoadingDots />
        </div>
      ) : isSuccess ? (
        // TODO: render conditionally since its only for super_driver
        <>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="primary-input"
          >
            <option value="">{t("buttons.invoiceSelectDefault")}</option>
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
            sumMileage={sumSelectedTripsMileage()}
            defaultRate={defaultRate(hourRates)}
            selectedRate={countryRate(hourRates, selectedCountry)}
          />
        </>
      ) : (
        <div className="invoice-values empty">{t("misc.invoiceEmpty")}</div>
      )}
    </div>
  );

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
        {invoiceComponent}
      </div>
    </div>
  );
};
export default InvoiceWrapper;
