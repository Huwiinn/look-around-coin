import axios from "axios";

export const coinsData = async () => {
  try {
    const resData = await axios.get("https://api.coinlore.net/api/tickers/");

    console.log(111, resData);
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
