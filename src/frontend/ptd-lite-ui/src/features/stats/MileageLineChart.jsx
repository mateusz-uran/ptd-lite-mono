import React from "react";
import { useTranslation } from "react-i18next";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MileageLineChart = ({ stat }) => {
  const { t } = useTranslation();

  return (
    <div className="linechart">
      <h5>{t("statistics.headerLine")}</h5>
      <ResponsiveContainer width={600} height="80%">
        <LineChart
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray={"5 5"} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={t("statistics.mileage")}
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MileageLineChart;
