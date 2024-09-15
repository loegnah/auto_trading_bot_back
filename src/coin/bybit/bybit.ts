import { KlineIntervalV3, RestClientV5 } from "bybit-api";
import dayjs from "dayjs";
import { env } from "@/lib/env";

export const bybit = new RestClientV5({
  key: env.BYBIT_API_KEY,
  secret: env.BYBIT_API_SECRET,
  testnet: !!env.BYBIT_TESTNET,
});

export async function getKlines({
  symbol,
  interval,
  count,
  endTimeStamp = dayjs().unix(),
}: {
  symbol: string;
  interval: KlineIntervalV3;
  count: number;
  endTimeStamp?: number;
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
  positionSide,
  symbol,
  qty,
  takeProfit,
  stopLoss,
}: {
  positionSide: "long" | "short";
  symbol: string;
  qty: number;
  takeProfit?: number; // not percent, just base coin value
  stopLoss?: number; // not percent, just base coin value
}) {
  return bybit.submitOrder({
    category: "linear",
    side: positionSide === "long" ? "Buy" : "Sell",
    orderType: "Market",
    symbol,
    qty: qty.toString(),
    tpslMode: "Full",
    takeProfit: takeProfit?.toString(),
    stopLoss: stopLoss?.toString(),
  });
}

export async function getPositions({
  symbol,
  settleCoin,
}: {
  symbol?: string;
  settleCoin?: string;
}) {
  if (!symbol && !settleCoin) {
    throw new Error("symbol or settleCoin is required");
  }
  return bybit.getPositionInfo({
    category: "linear",
    settleCoin,
    symbol,
  });
}

export async function getLeverage({ symbol }: { symbol: string }) {
  const positionInfo = await bybit.getPositionInfo({
    category: "linear",
    symbol,
  });

  return positionInfo.result.list.length
    ? positionInfo.result.list[0].leverage
    : null;
}

export async function setLeverage({
  symbol,
  leverage,
}: {
  symbol: string;
  leverage: number;
}) {
  const ret = await bybit.setLeverage({
    category: "linear",
    symbol,
    buyLeverage: leverage.toString(),
    sellLeverage: leverage.toString(),
  });
  if (ret.retMsg !== "OK") {
    throw new Error(ret.retMsg);
  }
  return leverage;
}

export async function setTpsl({
  symbol,
  takeProfit,
  stopLoss,
}: {
  symbol: string;
  takeProfit?: number;
  stopLoss?: number;
}) {
  const ret = await bybit.setTradingStop({
    category: "linear",
    symbol,
    tpslMode: "Full",
    positionIdx: 0,
    takeProfit: takeProfit?.toString(),
    stopLoss: stopLoss?.toString(),
  });
  if (ret.retMsg !== "OK") {
    throw new Error(ret.retMsg);
  }
  return ret;
}

export async function closePosition({
  symbol,
  positionSide,
}: {
  symbol: string;
  positionSide: "long" | "short";
}) {
  return bybit.submitOrder({
    category: "linear",
    side: positionSide === "long" ? "Sell" : "Buy",
    orderType: "Market",
    symbol,
    qty: "0",
    reduceOnly: true,
  });
}
