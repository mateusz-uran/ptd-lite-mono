import { useSelector } from 'react-redux';
import { checkCurrency } from '../../../api/currency/currencyApiSlice';
import InvoiceCopy from './InvoiceCopy';

const Invoice = ({ sumMileage, defaultRate, selectedRate }) => {
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
  var selectedRegionFullname = regionNames.of(
    selectedRate ? selectedRateKey : ''
  );

  ('Usługa transportowa na terytorium Niemiec KURS ROZLICZENIA WALUTY ŚREDNI NBP Tabela nr 101/A/NBP/2023 z dnia 2023-05-26 EUR/PLN = 4,5242 (12€ x 4,5242 = 54,29)');
  var selectedCountryRatePerCurrencyMid = selectedRateValue * currencyRate;
  const invoiceText = `Usługa transportowa na terytorium ${selectedRegionFullname} \n KURS ROZLICZENIA WALUTY ŚREDNI NBP \n Tabela nr ${currencyTableNumber} z dnia ${currencyEffectiveDate} \n ${
    selectedCurrencyRate.code
  }/PLN (${selectedRateValue}\u20AC x ${currencyRate} = ${Number(
    selectedCountryRatePerCurrencyMid
  ).toFixed(2)})`;

  return (
    <div className="invoice-component">
      <div className="invoice-values">
        <div>
          Summary:&nbsp;<span>{`${sumMileage} km`}</span>
        </div>
        <div>
          Default rate:&nbsp;<span>{`${defaultRate} PLN`}</span>
        </div>
        <div>
          Country rate:&nbsp;
          <span>{`${selectedRate ? selectedRateValue : 0} PLN`}</span>
        </div>
        <div>
          Selected currency mid&nbsp;
          <span>{`${currencyRate} PLN`}</span>
        </div>
        <div>
          Driven hours&nbsp;<span>{`${calculateInvoice()} h`}</span>
        </div>
      </div>
      <InvoiceCopy copyText={invoiceText} />
    </div>
  );
};
export default Invoice;
