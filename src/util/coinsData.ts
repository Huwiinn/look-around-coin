import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// supabase db에서 데이터를 불러오도록 수정해야함.
// 현재 supabase db에는 코인시장 데이터밖에 없음.
// 각 상위 10개 코인을 db에 삽입시켜야하는 작업이 필요함. (1시간 단위로 해보자);

// Supabase 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export const coinsData = async () => {
  try {
    // const { data: priceTopTenCoins, error } = await supabase
    //   .from("priceTopTenCoins")
    //   .select("*");

    // console.log("priceTopTenCoins : ", priceTopTenCoins);

    const res = await axios.get("https://api.coinlore.net/api/tickers/");
    const resData = res.data;

    return resData;
  } catch (err) {
    console.log("err Message : ", err);
  }
};

export const coinsGlobalData = async () => {
  try {
    const res = await axios.get("https://api.coinlore.net/api/global/");
    const resData = res.data;

    return resData;
  } catch (err) {
    console.log("err Message : ", err);
  }
};
