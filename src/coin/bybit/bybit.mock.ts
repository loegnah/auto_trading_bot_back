import { env } from "@/lib/env";
import { Topic } from "@/lib/trade";

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
