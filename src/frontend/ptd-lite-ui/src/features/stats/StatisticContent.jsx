import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetStatisticsFromYearByUsernameQuery } from "../../api/stats/statsApiSlice";
import MileageLineChart from "./MileageLineChart";
import CardCounterPieChart from "./CardCounterPieChart";
import "../../css/statistics.css";
import LoadingDots from "../../components/LoadingDots";

const StatisticContent = () => {
  const { t } = useTranslation();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [statsYear, setStatsYear] = useState(currentYear);

  // TODO: retrieve nickname from local storage
  const nickname = "John Doe";
  const {
    data: statisticFromYear,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetStatisticsFromYearByUsernameQuery({
    year: statsYear,
    username: nickname,
  });

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

  const years = Array.from(
    { length: currentYear - 2022 },
    (_, index) => 2023 + index
  );

  return (
    <div id="statistics">
      <div className="pick-year-wrapper">
        {years.map((y, index) => (
          <div key={index} className="pick-year">
            <button
              className={`small-btn ${statsYear == y ? "pick-year-btn" : ""}`}
              onClick={() => setStatsYear(y)}
            >
              {y}
            </button>
          </div>
        ))}
      </div>
      <section>{sectionContent}</section>
      <p className="info">
        <small>* {t("statistics.info1")}</small>
        {/* <small>* {t("statistics.info2")}</small> */}
      </p>
    </div>
  );
};

export default StatisticContent;
