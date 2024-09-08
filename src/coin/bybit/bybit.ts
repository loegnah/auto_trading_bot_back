import { RestClientV5 } from "bybit-api";
import { env } from "@/lib/env";

export const bybit = new RestClientV5({
  key: env.BYBIT_API_KEY,
  secret: env.BYBIT_API_SECRET,
});

export async function getKline() {
  return bybit.getKline({
    category: "inverse",
    symbol: "BTCUSD",
    interval: "60",
    end: Date.now(),
    limit: 1,
  });
}

export async function getBybitServerTime() {
  return bybit.getServerTime();
}
