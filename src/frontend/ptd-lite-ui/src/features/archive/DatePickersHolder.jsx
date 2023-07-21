import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, parse } from 'date-fns';
import { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import en from 'date-fns/locale/en-GB';
import { useDispatch, useSelector } from 'react-redux';
import {
  endDateFromRange,
  isFetchingByDatesRange,
  startDateFromRange,
  storeDatesRange,
} from './datesRangeSlice';
import { useTranslation } from 'react-i18next';
registerLocale('pl', pl);
registerLocale('en', en);

const parseDate = (dateString) => {
  return dateString
    ? parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date())
    : new Date();
};

const DatePickers = ({ refetchCards }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  var detectLocale = navigator.language;
  const startDateRange = useSelector(startDateFromRange);
  const endDateRange = useSelector(endDateFromRange);
  const skipStatus = useSelector(isFetchingByDatesRange);

  const [startDate, setStartDate] = useState(() => parseDate(startDateRange));
  const [endDate, setEndDate] = useState(() => parseDate(endDateRange));

  const handleDateRange = () => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd HH:mm:ss');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd HH:mm:ss');
    dispatch(
      storeDatesRange({ start: formattedStartDate, end: formattedEndDate })
    );
    if (skipStatus) {
      refetchCards();
    }
  };

  useEffect(() => {
    if (startDateRange) {
      setStartDate(parseDate(startDateRange));
    }
    if (endDateRange) {
      setEndDate(parseDate(endDateRange));
    }
  }, []);

  return (
    <>
      <div className="date-pickers">
        <div className="date-wrapper">
          <span>{t('misc.dateFrom')}: </span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={detectLocale}
            dateFormat="dd/MM/yyyy"
            className="primary-input"
          />
        </div>
        <div className="date-wrapper">
          <span>{t('misc.dateTo')}: </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            locale={detectLocale}
            dateFormat="dd/MM/yyyy"
            className="primary-input"
          />
        </div>
      </div>
      <button onClick={handleDateRange} className="primary-btn">
        {t('buttons.search')}
      </button>
    </>
  );
};
export default DatePickers;
