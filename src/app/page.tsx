"use client";

import React, { useState, useEffect } from "react";
import LayoutBody from "../components/LayoutBody";
import { coinsData, coinsGlobalData } from "../util/coinsData";
import { colorTk } from "../style/token";
import { globalCoinsInfoData } from "../../data/common";

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
  [key: string]: any;
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

  useEffect(() => {
    const fetchGlobalCoins = async () => {
      const data = await coinsGlobalData();
      setGlobalCoins(data[0]);
    };

    fetchGlobalCoins();
  }, []);

  return (
    <>
      <LayoutBody>
        <section id="sec1">
          <div className="global_coins_info_box">
            <h1 className="info_title">글로벌 암호화폐 요약 정보</h1>
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
          line-height: 1.5;
           {
            /* box-shadow: 12px 24px 12px ${colorTk[2].midBlue}; */
          }
        }
      `}</style>
    </>
  );
}
