import { useDispatch, useSelector } from 'react-redux';
import {
  checkCurrency,
  checkCurrencyError,
  checkCurrencyStatus,
  retrieveEuroRate,
} from '../api/currency/currencyApiSlice';
import { useEffect } from 'react';
import LoadingDots from './LoadingDots';

const CurrencyCard = () => {
  const dispatch = useDispatch();
  const currency = useSelector(checkCurrency);
  const currencyStatus = useSelector(checkCurrencyStatus);
  const currencyError = useSelector(checkCurrencyError);

  useEffect(() => {
    if (currencyStatus === 'idle') {
      dispatch(retrieveEuroRate());
    }
  }, [currencyStatus, dispatch]);

  let currencyContent;

  if (currencyStatus === 'loading') {
    currencyContent = (
      <div className="currency-card">
        <LoadingDots />
      </div>
    );
  } else if (currencyStatus === 'success') {
    currencyContent = (
      <div className="currency-card">
        <div className="h-wrapper">
          <h5>&euro; {currency.code}</h5>
        </div>
        <div className="content-wrapper">
          {currency.rates.map((rate, index) => (
            <div key={index} className="rate-content">
              <div>
                <p>Table:</p>&nbsp;
                <p>{rate.no}</p>
              </div>
              <div>
                <p>Effective date:</p>&nbsp;
                <p>{rate.effectiveDate}</p>
              </div>
              <div>
                <p>Mid:</p>&nbsp;
                <p>{rate.mid}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (currencyStatus === 'error') {
    currencyContent = (
      <div className="currency-card">
        <h5>Error: {currencyError}</h5>
      </div>
    );
  }
  return currencyContent;
};
export default CurrencyCard;
