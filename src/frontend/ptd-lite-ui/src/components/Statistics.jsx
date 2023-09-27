import Header from "./Header";
import StatisticContent from "../features/stats/StatisticContent";
import { useTranslation } from "react-i18next";

const Statistics = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header
        compArray={[
          {
            compName: t("misc.stats"),
          },
        ]}
      />
      <StatisticContent />
    </div>
  );
};
export default Statistics;
