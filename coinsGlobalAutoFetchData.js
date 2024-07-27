const axios = require("axios");
import { createClient } from "@supabase/supabase-js";

try {
  // Supabase 설정
  const supabaseUrl = "https://hjgufwdycaoubgxptwzn.supabase.co";
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const coinsGlobalAutoFetchData = async () => {
    try {
      const res = await axios.get("https://api.coinlore.net/api/global");
      const resData = res.data;

      return resData;
    } catch (err) {
      console.log("coinsGlobalAutoFetchData Fn err Message : ", err);
    }
  };

  // 데이터베이스에 데이터 삽입 함수
  async function insertCoinMarketData(data) {
    const { data: insertData, error } = await supabase
      .from("marketStatus")
      .insert([
        {
          active_markets: data.active_markets,
          avg_change_percent: data.avg_change_percent,
          btc_d: data.btc_d,
          coins_count: data.coins_count,
          eth_d: data.eth_d,
          mcap_ath: data.mcap_ath,
          mcap_change: data.mcap_change,
          total_mcap: data.total_mcap,
          total_volume: data.total_volume,
          volume_ath: data.volume_ath,
          volume_change: data.volume_change,
          timestamp: new Date().toISOString(),
        },
      ]);

    console.log({ insertData, error });

    if (error) {
      console.error("insertCoinMarketData Fn Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", insertData);
    }
  }

  async function main() {
    try {
      const data = await coinsGlobalAutoFetchData(); // 데이터를 가져옴
      await insertCoinMarketData(data); // 데이터를 데이터베이스에 삽입
    } catch (error) {
      console.log("main Fn Error reason : ", error);
    }
  }

  main(); // 메인 함수 실행
} catch (error) {
  console.log("Error reason : ", error);
}
