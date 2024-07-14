import axios from "axios";

export const coinsData = async () => {
  try {
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
