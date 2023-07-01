import '../css/archives.css';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetCardsFromArchiveQuery } from '../api/card/cardApiSlice';
import CardItem from '../features/cards/CardItem';
import LoadingDots from './LoadingDots';
import CardForm from '../features/cards/CardForm';

import DatePickers from '../features/archive/DatePickers';
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

  let payload = {
    username: user.nickname,
    firstDate: String(startDateRange),
    secondDate: String(endDateRange),
  };
  const {
    data: allCards,
    isSuccess,
    isError,
    isLoading,
    refetch,
  } = useGetCardsFromArchiveQuery(payload, {
    skip: !skipStatus,
  });

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
    archiveBody = <CardItem cards={allCards} compName={'archive'} />;
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
        <DatePickers refetchCards={refetch} />
      </section>
      <div>
        <CardForm />
      </div>
      <div>{archiveBody}</div>
    </div>
  );
};
export default Archives;
