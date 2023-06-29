import { useTranslation } from 'react-i18next';
import Header from './Header';

const Archives = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header
        compArray={[
          {
            compName: t('misc.arch'),
          },
        ]}
      />
      <section>arch</section>
    </div>
  );
};
export default Archives;
