import { useTranslation } from 'react-i18next';
import Header from './Header';

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
    </div>
  );
};
export default Dashboard;
