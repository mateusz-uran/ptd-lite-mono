import { useTranslation } from "react-i18next";
import Header from "./Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetStatisticsFromYearByUsernameQuery } from "../api/stats/statsApiSlice";
import MileageLineChart from "../features/stats/MileageLineChart";
import CardCounterPieChart from "../features/stats/CardCounterPieChart";
import "../css/statistics.css";
import { useState } from "react";
import LoadingDots from "./LoadingDots";

const Statistics = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const currentDate = new Date();
  const [statsYear, setStatsYear] = useState(currentDate.getFullYear());

  const {
    data: statisticFromYear,
    isSuccess,
    isError,
    isLoading,
  } = useGetStatisticsFromYearByUsernameQuery({
    year: statsYear,
    username: user.nickname,
  });

  let sectionContent;

  if (isLoading) {
    sectionContent = <LoadingDots />;
  }

  if (isError) {
    sectionContent = (
      <div className="stat-error">
        <p>Something went wrong, try to refresh</p>
        <button
          className="secondary-btn"
          onClick={() => window.location.reload(false)}
        >
          Refresh
        </button>
      </div>
    );
  }

  const monthNames = [
    t("statistics.january"),
    t("statistics.february"),
    t("statistics.march"),
    t("statistics.april"),
    t("statistics.may"),
    t("statistics.june"),
    t("statistics.july"),
    t("statistics.august"),
    t("statistics.september"),
    t("statistics.october"),
    t("statistics.november"),
    t("statistics.december"),
  ];

  var mappedStatistics =
    !isLoading &&
    isSuccess &&
    statisticFromYear?.map((item) => {
      const [year, month] = item.yearMonth.split("-");
      const monthName = `${monthNames[parseInt(month) - 1]}`;
      return {
        name: monthName,
        [t("statistics.mileage")]: item.cardMileage,
        [t("statistics.counter")]: item.cardCounter,
      };
    });

  if (!isLoading && isSuccess) {
    sectionContent = (
      <>
        <MileageLineChart stat={mappedStatistics}></MileageLineChart>
        <CardCounterPieChart stat={mappedStatistics}></CardCounterPieChart>
      </>
    );
  }

  return (
    <div id="statistics">
      <Header
        compArray={[
          {
            compName: t("misc.stats"),
          },
        ]}
      />
      <section>{sectionContent}</section>
      <p className="info">
        <small>* {t("statistics.info1")}</small>
        <small>* {t("statistics.info2")}</small>
      </p>
    </div>
  );
};
export default Statistics;
