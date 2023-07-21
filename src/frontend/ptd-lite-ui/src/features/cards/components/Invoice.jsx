import { useSelector } from 'react-redux';
import { checkCurrency } from '../../../api/currency/currencyApiSlice';
import InvoiceCopy from './InvoiceCopy';
import { useTranslation } from 'react-i18next';

const Invoice = ({ sumMileage, defaultRate, selectedRate }) => {
  const { t } = useTranslation();
  var detectLocale = navigator.language;
  const selectedCurrencyRate = useSelector(checkCurrency);

  var currencyRate =
    selectedCurrencyRate.length <= 0 ? 0 : selectedCurrencyRate.rates[0].mid;

  const selectedRateKey = selectedRate ? Object.keys(selectedRate)[0] : '';
  const selectedRateValue = selectedRate ? Object.values(selectedRate)[0] : 0;

  var currencyTableNumber =
    selectedCurrencyRate.length <= 0 ? '' : selectedCurrencyRate.rates[0].no;

  var currencyEffectiveDate =
    selectedCurrencyRate.length <= 0
      ? ''
      : selectedCurrencyRate.rates[0].effectiveDate;

  function calculateInvoice() {
    let calculatedDefaultRate = sumMileage * defaultRate;
    if (currencyRate !== 0 && selectedRateValue !== 0) {
      let calculatedCountryRate = selectedRateValue * currencyRate;
      return Number(calculatedDefaultRate / calculatedCountryRate).toFixed(2);
    } else return 0;
  }

  const regionNames = new Intl.DisplayNames([detectLocale], { type: 'region' });
  var selectedRegionFullname = selectedRate
    ? regionNames.of(selectedRateKey)
    : '';

  var selectedCountryRatePerCurrencyMid = selectedRateValue * currencyRate;

  const countryName = selectedRegionFullname || '...';
  const currencyTable = currencyTableNumber || '...';
  const currencyDate = currencyEffectiveDate || '...';
  const currencyCode = selectedCurrencyRate.code || '?';
  const drivenHours = Number(selectedCountryRatePerCurrencyMid).toFixed(2);

  const invoiceText = t('misc.invoiceCopyText', {
    countryName,
    currencyTable,
    currencyDate,
    currencyCode,
    selectedRateValue,
    currencyRate,
    drivenHours,
    interpolation: { escapeValue: false },
  });

  return (
    <div className="invoice-component">
      <div className="invoice-values">
        <div>
          {t('misc.invoiceKmSummary')}:&nbsp;<span>{`${sumMileage} km`}</span>
        </div>
        <div>
          {t('misc.invoiceDefault')}:&nbsp;<span>{`${defaultRate} PLN`}</span>
        </div>
        <div>
          {t('misc.invoiceCountry')}:&nbsp;
          <span>{`${selectedRate ? selectedRateValue : 0} \u20AC`}</span>
        </div>
        <div>
          {t('misc.invoiceSelectedMid')}:&nbsp;
          <span>{`${currencyRate} PLN`}</span>
        </div>
        <div>
          {t('misc.invoiceHours')}:&nbsp;
          <span>{`${calculateInvoice()} h`}</span>
        </div>
      </div>
      <InvoiceCopy copyText={invoiceText} />
    </div>
  );
};
export default Invoice;
