import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetStatisticsFromYearByUsernameQuery } from "../../api/stats/statsApiSlice";
import MileageLineChart from "./MileageLineChart";
import CardCounterPieChart from "./CardCounterPieChart";
import "../../css/statistics.css";
import LoadingDots from "../../components/LoadingDots";

const StatisticContent = ({ fetchData }) => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const currentDate = new Date();
  const [statsYear, setStatsYear] = useState(currentDate.getFullYear());

  const {
    data: statisticFromYear,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetStatisticsFromYearByUsernameQuery(
    {
      year: statsYear,
      username: user.nickname,
    },
    { skip: !fetchData }
  );

  let sectionContent;

  if (isLoading) {
    sectionContent = <LoadingDots />;
  }

  if (isSuccess && Boolean(statisticFromYear.length == 0)) {
    sectionContent = (
      <div className="stat-error">
        <p>{t("statistics.error2")}</p>
      </div>
    );
  }

  if (isError && error.statusCode === 404) {
    sectionContent = (
      <div className="stat-error">
        <p>{t("statistics.error2")}</p>
      </div>
    );
  }

  if (isError) {
    sectionContent = (
      <div className="stat-error">
        <p>{t("statistics.error1")}</p>
        <button
          className="secondary-btn"
          onClick={() => window.location.reload(false)}
        >
          {t("buttons.refresh")}
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
    statisticFromYear.length !== 0 &&
    statisticFromYear?.map((item) => {
      const [year, month] = item.yearMonth.split("-");
      const monthName = `${monthNames[parseInt(month) - 1]}`;
      return {
        name: monthName,
        [t("statistics.mileage")]: item.cardMileage,
        [t("statistics.counter")]: item.cardCounter,
      };
    });

  if (!isLoading && isSuccess && statisticFromYear.length !== 0) {
    sectionContent = (
      <>
        <MileageLineChart stat={mappedStatistics}></MileageLineChart>
        <CardCounterPieChart stat={mappedStatistics}></CardCounterPieChart>
      </>
    );
  }
  return (
    <div id="statistics">
      <section>{sectionContent}</section>
      <p className="info">
        <small>* {t("statistics.info1")}</small>
        <small>* {t("statistics.info2")}</small>
      </p>
    </div>
  );
};

export default StatisticContent;
