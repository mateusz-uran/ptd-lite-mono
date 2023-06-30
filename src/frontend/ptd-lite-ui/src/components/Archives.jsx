import { useTranslation } from 'react-i18next';
import Header from './Header';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetCardsFromArchiveQuery } from '../api/card/cardApiSlice';

const Archives = () => {
  const [skip, setSkip] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { t } = useTranslation();
  const { user } = useAuth0();

  const formattedDateStart = format(startDate, 'yyyy-MM-dd HH:mm:ss');
  const formattedDateEnd = format(endDate, 'yyyy-MM-dd HH:mm:ss');
  let payload = {
    username: user.nickname,
    firstDate: String(formattedDateStart),
    secondDate: String(formattedDateEnd),
  };
  const {
    data: allCards,
    isSuccess,
    isError,
    isLoading,
    refetch,
  } = useGetCardsFromArchiveQuery(payload, { skip });

  const handleFormatting = () => {
    setSkip(false);
    if (!skip) {
      refetch();
    }
  };

  return (
    <div>
      <Header
        compArray={[
          {
            compName: t('misc.arch'),
          },
        ]}
      />
      <section>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </section>
      <button onClick={handleFormatting}>test</button>
    </div>
  );
};
export default Archives;
