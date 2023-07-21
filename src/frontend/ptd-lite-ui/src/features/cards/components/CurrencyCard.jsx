import { useDispatch, useSelector } from 'react-redux';
import {
  checkCurrency,
  checkCurrencyStatus,
  retrieveEuroRate,
} from '../../../api/currency/currencyApiSlice';
import { useEffect } from 'react';
import LoadingDots from '../../../components/LoadingDots';
import { useTranslation } from 'react-i18next';

const CurrencyCard = ({ date }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currency = useSelector(checkCurrency);
  const currencyStatus = useSelector(checkCurrencyStatus);

  useEffect(() => {
    if (currencyStatus === 'idle') {
      dispatch(retrieveEuroRate(date));
    }
  }, [currencyStatus, dispatch, date]);

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
          {currency?.rates?.map((rate, index) => (
            <div key={index} className="rate-content">
              <div>
                {t('misc.currencyTable')}:&nbsp;<span>{rate.no}</span>
              </div>
              <div>
                {t('misc.currencyDate')}:&nbsp;<span>{rate.effectiveDate}</span>
              </div>
              <div>
                {t('misc.currencyMid')}:&nbsp;<span>{`${rate.mid} PLN`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (currencyStatus === 'error') {
    currencyContent = (
      <div className="currency-card">
        <h5>{t('misc.currencyError')}</h5>
      </div>
    );
  }
  return currencyContent;
};
export default CurrencyCard;
