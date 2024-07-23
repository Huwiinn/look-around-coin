export const coinsGlobalAutoFetchData = async () => {
  try {
    const res = await axios.get("https://api.coinlore.net/api/global");
    const resData = res.data;

    return resData;
  } catch (err) {
    console.log("err Message : ", err);
  }
};

coinsGlobalAutoFetchData();
