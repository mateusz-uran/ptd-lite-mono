import '../css/archives.css';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetCardsFromArchiveQuery } from '../api/card/cardApiSlice';
import CardItem from '../features/cards/components/CardItem';
import LoadingDots from './LoadingDots';
import CardForm from '../features/cards/forms/CardForm';

import DatePickersHolder from '../features/archive/DatePickersHolder';
import { useSelector } from 'react-redux';
import {
  endDateFromRange,
  isFetchingByDatesRange,
  startDateFromRange,
} from '../features/archive/datesRangeSlice';

const Archives = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  let archiveBody;

  const skipStatus = useSelector(isFetchingByDatesRange);
  const startDateRange = useSelector(startDateFromRange);
  const endDateRange = useSelector(endDateFromRange);

  const {
    data: allCards,
    isSuccess,
    isError,
    isLoading,
    refetch,
  } = useGetCardsFromArchiveQuery(
    {
      username: user.nickname,
      firstDate: String(startDateRange),
      secondDate: String(endDateRange),
    },
    {
      skip: !skipStatus,
    }
  );

  archiveBody = (
    <div className="card-wrapper">
      <div className="single-card error">
        <span>{t('misc.datePicker')}</span>
      </div>
    </div>
  );

  if (isLoading) {
    archiveBody = (
      <div className="card-wrapper">
        <div className="single-card">
          <LoadingDots />
        </div>
      </div>
    );
  }

  if (isError) {
    archiveBody = (
      <div className="card-wrapper">
        <div className="single-card error">
          <span>{t('misc.errorMessage')}</span>
        </div>
      </div>
    );
  }

  if (isSuccess && allCards?.length >= 1) {
    archiveBody = <CardItem cards={allCards} />;
  }

  if (isSuccess && allCards?.length <= 0) {
    archiveBody = (
      <div className="card-wrapper">
        <div className="single-card error">
          <span>{t('misc.noCards')}.</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        compArray={[
          {
            compName: t('misc.arch'),
          },
        ]}
      />
      <section className="pickers">
        <DatePickersHolder refetchCards={refetch} />
      </section>
      <div>
        <CardForm />
      </div>
      <div>{archiveBody}</div>
    </div>
  );
};
export default Archives;
