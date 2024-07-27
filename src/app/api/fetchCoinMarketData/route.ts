import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Supabase 설정
const supabaseUrl = "https://hjgufwdycaoubgxptwzn.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey as string);

// 코인 시장 데이터 수집 함수
async function fetchCoinMarketData() {
  try {
    const response = await axios.get("https://api.coinlore.net/api/global/");
    console.log("response : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// 데이터베이스에 데이터 삽입 함수
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

// GET 메소드 처리기
export async function GET() {
  console.log("API Route Accessed");
  const data = await fetchCoinMarketData();

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
