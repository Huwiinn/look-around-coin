import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Supabase 설정
const supabaseUrl = "https://hjgufwdycaoubgxptwzn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey as string);

// 코인 시장 데이터 수집 함수
async function getCoinMarketData() {
  try {
    const response = await axios.get("https://api.coinlore.net/api/global/");
    console.log("response : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// 데이터베이스에 코인 시장 데이터 삽입 함수
async function insertCoinMarketData(data: any) {
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
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully:", insertData);
  }
}

// 시장가 상위 10개 코인 데이터 수집
async function getPriceTopTenCoinsData() {
  try {
    const response = await axios.get("https://api.coinlore.net/api/tickers/");
    // console.log("response.data : ", response.data.data.slice(0, 10));
    return response.data.data.slice(0, 10);
  } catch (error) {
    console.error("Error get top ten coins data:", error);
    return null;
  }
}

// 데이터베이스에 시장가 상위 10개 코인 데이터 삽입
async function insertPriceTopTenCoinsData(data: any[]) {
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

// POST 메소드 처리기
export async function POST() {
  console.log("API Route Accessed");
  const data = await getCoinMarketData();

  if (data && data.length > 0) {
    await insertCoinMarketData(data[0]); // API 응답에서 첫 번째 데이터 사용
    return NextResponse.json({
      message: "Data fetched and inserted successfully",
    });
  } else {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
