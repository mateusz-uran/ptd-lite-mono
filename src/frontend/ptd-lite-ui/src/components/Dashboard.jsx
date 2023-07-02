import { useTranslation } from 'react-i18next';
import Header from './Header';
import TestTripTable from './TestTripTable';
import { fakeTrips } from '../features/trips/tripDummyData';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header
        compArray={[
          {
            compName: t('misc.dashboard'),
          },
        ]}
      />
      <section>dashboard</section>
      <div>
        <TestTripTable tripDummyEntities={fakeTrips} />
      </div>
    </div>
  );
};
export default Dashboard;
