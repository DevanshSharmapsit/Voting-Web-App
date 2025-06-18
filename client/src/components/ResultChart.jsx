import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ResultChart = ({ results }) => {
  const labels = results.map((r) => r.option);
  const data = results.map((r) => r.votes);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Votes",
        data,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Bar data={chartData} />
    </div>
  );
};

export default ResultChart;
