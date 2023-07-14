import '../css/dashboard.css';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import CurrencyCard from './CurrencyCard';

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
      <section>
        <CurrencyCard />
      </section>
    </div>
  );
};
export default Dashboard;
