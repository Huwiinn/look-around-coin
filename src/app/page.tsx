"use client";

import React, { useState, useEffect } from "react";
import LayoutBody from "../components/LayoutBody";
import { coinsData, coinsGlobalData } from "../util/coinsData";
import { colorTk } from "../style/token";
import { globalCoinsInfoData } from "../../data/common";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {};
const lineChartData = {
  labels: ["월", "화", "수", "목", "금", "토", "일"],
  datasets: [
    {
      label: "내 걸음 수",
      data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
      borderColor: "rgb(75, 192,192)",
    },
    {
      label: "평균 걸음 수",
      data: [8000, 7000, 10000, 6000, 8000, 5000, 12000],
      borderColor: "rgb(0, 22, 324)",
    },
  ],
};

export type GlobalCoinsInfo = {
  active_markets: number; // 활성화 코인 개수
  avg_change_percent: string; // 평균 변화 퍼센트
  btc_d: string;
  coins_count: number;
  eth_d: string;
  mcap_ath: number;
  mcap_change: string;
  total_mcap: number;
  total_volume: number;
  volume_ath: number;
  volume_change: string;
  [key: string]: any; // 시그니처 인덱스
};

export default function Home() {
  const [globalCoins, setGlobalCoins] = useState<GlobalCoinsInfo>({
    active_markets: 0,
    avg_change_percent: "",
    btc_d: "",
    coins_count: 0,
    eth_d: "",
    mcap_ath: 0,
    mcap_change: "",
    total_mcap: 0,
    total_volume: 0,
    volume_ath: 0,
    volume_change: "",
  });
  const [coinData, setCoinData] = useState({
    data: [],
    info: { coins_num: "", time: "" },
  });

  useEffect(() => {
    const fetchGlobalCoins = async () => {
      const data = await coinsGlobalData();
      setGlobalCoins(data[0]);
    };

    const fetchCoinData = async () => {
      const data = await coinsData();
      // console.log("data : ", data);
      setCoinData(data);
    };

    fetchGlobalCoins();
    fetchCoinData();
  }, []);

  const timestamp = Number(coinData.info.time);
  const date = new Intl.DateTimeFormat("ko-KR").format(timestamp * 1000);

  return (
    <>
      <LayoutBody>
        <section id="sec1">
          <div className="global_coins_info_box">
            <div className="title_wrap">
              <h1 className="info_title">글로벌 암호화폐 요약 정보</h1>
              <p>기준 : {date}</p>
            </div>
            {globalCoins ? (
              <div className="info_wrap">
                {globalCoinsInfoData.map((info, idx) => {
                  return (
                    <p key={info.key}>
                      {info.label}:{" "}
                      {globalCoins[info.key].toLocaleString() + info.unit}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p>데이터를 불러오는 중...</p>
              // 로딩스피너 적용해야함
            )}
          </div>

          <Line options={options} data={lineChartData} />
        </section>
      </LayoutBody>
      <style jsx>{`
        .container {
          padding: 0 20px;
        }

        #sec1 {
          padding-top: 80px;
        }

        .info_title {
          font-size: 32px;
          color: ${colorTk[0].topBlue};
        }

        .title_wrap {
          margin-bottom: 24px;
        }

        .global_coins_info_box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .info_wrap {
          padding: 32px;
          border: 1px solid gray;
          border-radius: 12px;
          line-height: 1.75;
        }
      `}</style>
    </>
  );
}
