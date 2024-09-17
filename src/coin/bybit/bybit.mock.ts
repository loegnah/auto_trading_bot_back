import { env } from "@/lib/env";

export async function getMockClientAuths() {
  return [
    {
      apiKey: env.BYBIT_API_KEY,
      apiSecret: env.BYBIT_API_SECRET,
      testnet: true,
    },
  ];
}

export async function getMockTopics() {
  return ["kline.3.BTCUSDT"];
}
