import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// type globalCoinsProps = {
//   active_markets: number; // 활성화 코인 개수
//   avg_change_percent: string; // 평균 변화 퍼센트
//   btc_d: string;
//   coins_count: number;
//   eth_d: string;
//   mcap_ath: number;
//   mcap_change: string;
//   total_mcap: number;
//   total_volume: number;
//   volume_ath: number;
//   volume_change: string;
// };

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  // LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CoinMarketChart = (coinData: any) => {
  const topCoinName = coinData.coinData.data
    .map((coin: any) => coin["name"])
    .slice(0, 10);

  const topCoinPrice = coinData.coinData.data
    .map((coin: any) => coin["price_usd"])
    .slice(0, 10);

  const options = {
    responsive: true,
  };

  const lineChartData = {
    labels: topCoinName,
    datasets: [
      {
        label: "현재 코인 가격",
        data: topCoinPrice,
        backgroundColor: "rgb(75, 192,192)",
      },
    ],
  };

  // console.log("coinData : ", coinData);
  console.log("topCoinPrice : ", topCoinPrice);
  return <Bar options={options} data={lineChartData} />;
};

export default CoinMarketChart;
