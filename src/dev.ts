import { candleChannel } from "./channel/channel";

export async function dev() {
  console.log("dev");
  candleChannel.on("bybit", "kline.1.BTCUSDT", (candle) => {
    console.log(candle);
  });
}
