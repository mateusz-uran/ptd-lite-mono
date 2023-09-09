import { useTranslation } from 'react-i18next';
import Header from './Header';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetStatisticsFromYearByUsernameQuery } from '../api/stats/statsApiSlice';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Statistics = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();

  const {
    data: statisticFromYear,
    isSuccess,
    isError,
    isLoading,
  } = useGetStatisticsFromYearByUsernameQuery({
    year: 2023,
    username: user.nickname,
  });

  return (
    <div>
      <Header
        compArray={[
          {
            compName: t('misc.stats'),
          },
        ]}
      />
      <section>
        <BarChart
          width={500}
          height={300}
          data={statisticFromYear}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="yearMonth" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cardCounter" fill="#8884d8" />
          <Bar dataKey="cardMileage" fill="#82ca9d" />
        </BarChart>
      </section>
    </div>
  );
};
export default Statistics;
