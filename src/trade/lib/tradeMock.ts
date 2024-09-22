import { env } from "@/common/env.ts";
import { Topic } from "@/trade/lib/tradeConst.ts";

export async function getMockClientAuths() {
  return [
    {
      apiKey: env.BYBIT_API_KEY,
      apiSecret: env.BYBIT_API_SECRET,
      testnet: true,
    },
  ];
}

export async function getMockTopics(): Promise<Topic[]> {
  return ["kline.3.BTCUSDT"];
}
