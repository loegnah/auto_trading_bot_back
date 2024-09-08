import { WebsocketClient } from "bybit-api";
import dayjs from "dayjs";
import { env } from "@/lib/env";

let wsClient: WebsocketClient;
let lastData: any = null;

export async function connectBybitWs() {
  wsClient = new WebsocketClient({
    key: env.BYBIT_API_KEY,
    secret: env.BYBIT_API_SECRET,
    market: "v5",
  });

  wsClient.on("update", (data) => {
    if (lastData && lastData.start !== data.data[0].start) {
      const timeFormatSeoul = dayjs(data.data[0].start)
        .tz("Asia/Seoul")
        .format("YYYY-MM-DD HH:mm:ss");
      console.log("----------------------");
      console.log(`[${timeFormatSeoul}]`);
      console.log(`open: ${lastData.open}`);
      console.log(`high: ${lastData.high}`);
      console.log(`low: ${lastData.low}`);
      console.log(`close: ${lastData.close}`);
    }
    lastData = data.data[0];
  });

  wsClient.on("open", (data) => {
    console.log("connection opened open:", data.wsKey);
  });
  wsClient.on("response", (data) => {
    console.log("log response: ", JSON.stringify(data, null, 2));
  });
  wsClient.on("reconnect", ({ wsKey }) => {
    console.log("ws automatically reconnecting.... ", wsKey);
  });
  wsClient.on("reconnected", (data) => {
    console.log("ws has reconnected ", data?.wsKey);
  });

  const topics = ["kline.3.BTCUSDT"];

  wsClient.subscribeV5(topics, "linear");
}
