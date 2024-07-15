import React from "react";
import { useTranslation } from "react-i18next";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6633",
  "#9966CC",
  "#00CC99",
  "#FF99CC",
  "#33CCCC",
  "#666699",
  "#FF66FF",
  "#6699FF",
];

const CardCounterPieChart = ({ stat }) => {
  const { t } = useTranslation();
  return (
    <div className="piechart">
      <h5>{t("statistics.headerPie")}</h5>
      <ResponsiveContainer width={400} height="80%" minHeight={250}>
        <PieChart
          margin={{
            right: 0,
            left: 0,
          }}
        >
          <Pie
            dataKey={t("statistics.counter")}
            isAnimationActive={true}
            label
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={80}
          >
            {stat.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CardCounterPieChart;
