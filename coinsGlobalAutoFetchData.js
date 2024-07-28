const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

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

    if (error) {
      console.error("insertCoinMarketData Fn Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", insertData);
    }
  }

  // 시장가 상위 10개 코인 데이터 수집
  async function getPriceTopTenCoinsData() {
    try {
      const response = await axios.get("https://api.coinlore.net/api/tickers/");
      return response.data.data.slice(0, 10);
    } catch (error) {
      console.error("Error get top ten coins data:", error);
      return null;
    }
  }

  // 데이터베이스에 시장가 상위 10개 코인 데이터 삽입
  async function insertPriceTopTenCoinsData(data) {
    try {
      data.map(async (coin) => {
        await supabase.from("priceTopTenCoins").insert([
          {
            csupply: coin.csupply,
            id: coin.id,
            market_cap_usd: coin.market_cap_usd,
            msupply: coin.msupply,
            name: coin.name,
            nameid: coin.nameid,
            percent_change_1h: coin.percent_change_1h,
            percent_change_7d: coin.percent_change_7d,
            percent_change_24h: coin.percent_change_24h,
            price_btc: coin.price_btc,
            price_usd: coin.price_usd,
            rank: coin.rank,
            symbol: coin.symbol,
            tsupply: coin.tsupply,
            volume24: coin.volume24,
            volume24a: coin.volume24a,
          },
        ]);
      });
    } catch (err) {
      console.log("시장가 상위 10개 코인 데이터 Error: ", err);
    }
  }

  async function main() {
    try {
      // 코인 시장 데이터
      const globalCoinData = await coinsGlobalAutoFetchData(); // 데이터를 가져옴
      await insertCoinMarketData(globalCoinData[0]); // 데이터를 데이터베이스에 삽입

      // 코인 시장가 상위 10개 코인 데이터
      const priceTopTenCoinsData = await getPriceTopTenCoinsData(); // 데이터를 가져옴
      await insertPriceTopTenCoinsData(priceTopTenCoinsData); // 데이터를 데이터베이스에 삽입

      console.log("Update DB success");
    } catch (error) {
      console.log("main Fn Error reason : ", error);
    }
  }

  main(); // 메인 함수 실행
} catch (error) {
  console.log("Error reason : ", error);
}
