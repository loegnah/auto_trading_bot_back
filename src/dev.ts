import { candleChannel } from "./channel/channel";

export async function dev() {
  // candleChannelTest();
}

async function candleChannelTest() {
  console.log("dev");
  candleChannel.on("bybit", "kline.1.BTCUSDT", (candle) => {
    console.log(candle);
  });
}
