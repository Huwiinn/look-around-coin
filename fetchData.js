const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const axios = require("axios");
require("dotenv").config();

console.log("SUPABASE_URL:", supabaseUrl);
console.log("SUPABASE_KEY:", supabaseKey);

if (!supabaseUrl) {
  throw new Error("supabaseUrl is required.");
}

if (!supabaseKey) {
  throw new Error("supabaseKey is required.");
}

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, async (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");

    try {
      const response = await axios.get(
        "http://localhost:3000/api/fetchCoinMarketData"
      );
      console.log("response : ", response);
      console.log("API call successful:", response.data);
    } catch (error) {
      console.error("Error calling API:", error);
    }

    process.exit(0);
  });
});
