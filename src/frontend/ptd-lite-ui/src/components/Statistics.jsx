import { useTranslation } from 'react-i18next';
import Header from './Header';

const Statistics = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header
        compArray={[
          {
            compName: t('misc.stats'),
          },
        ]}
      />
      <section>stats</section>
    </div>
  );
};
export default Statistics;
