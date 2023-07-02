import { useTranslation } from 'react-i18next';
import Header from './Header';
import TestTripTable from './TestTripTable';
import { tripDummyEntities } from '../features/trips/tripDummyData';

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
        <TestTripTable tripDummyEntities={tripDummyEntities} />
      </div>
    </div>
  );
};
export default Dashboard;
