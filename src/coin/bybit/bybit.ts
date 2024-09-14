import { KlineIntervalV3, RestClientV5 } from "bybit-api";
import { env } from "@/lib/env";

export const bybit = new RestClientV5({
  key: env.BYBIT_API_KEY,
  secret: env.BYBIT_API_SECRET,
  testnet: !!env.BYBIT_TESTNET,
});

export async function getKlines({
  symbol = "BTCUSDT",
  interval = "3",
  endTimeStamp = Date.now(),
  count = 1,
}: {
  symbol?: string;
  interval?: KlineIntervalV3;
  endTimeStamp?: number;
  count?: number;
}) {
  const klines = await bybit.getKline({
    category: "linear",
    symbol,
    interval,
    end: endTimeStamp,
    // count + 1 이유: endTimeStamp가 startTime 기준으로 적용되서
    // 마지막 하나의 캔들은 미완성 상태여서 제거하기 위함.
    limit: count + 1,
  });

  const parsedKlines = klines.result.list.slice(1).map((data) => ({
    startTime: Number(data[0]),
    open: Number(data[1]),
    high: Number(data[2]),
    low: Number(data[3]),
    close: Number(data[4]),
  }));

  return parsedKlines;
}

export async function getBybitServerTime() {
  return bybit.getServerTime();
}

export async function linearOrder({
  position,
  symbol,
  qty,
}: {
  position: "long" | "short";
  symbol: string;
  qty: number;
}) {
  return bybit.submitOrder({
    category: "linear",
    side: position === "long" ? "Buy" : "Sell",
    orderType: "Market",
    symbol,
    qty: qty.toString(),
  });
}

export async function getPositions() {
  return bybit.getPositionInfo({
    category: "linear",
    settleCoin: "USDT",
  });
}
