import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { GetMainContext } from "../Contexts/MainContext";
import { createDataForChart, generateRandomColors } from "../helpers/utilities";

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphicalChart = () => {
  const { storedCharacterData } = GetMainContext();
  const displayData = createDataForChart(storedCharacterData?.results);
  let labels = [];
  let data = [];
  for (const item of displayData) {
    labels.push(item.name);
    data.push(item.comics);
  }
  const { backgroundColors, borderColors } = generateRandomColors(
    displayData.length
  );
  const chartData = {
    labels,
    datasets: [
      {
        label: "Comics appeared in",
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const plugin = {
    beforeInit(chart) {
      const originalFit = chart.legend.fit;
  
      chart.legend.fit = function fit() {
        originalFit.bind(chart.legend)();
        this.height += 30;
      }
    }
  }

  return (
    <>
      <Doughnut plugins={[plugin]} data={chartData} />
    </>
  );
};

export default GraphicalChart;