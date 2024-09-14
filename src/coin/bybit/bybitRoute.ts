import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getKlines, getPositions, linearOrder } from "@/coin/bybit/bybit";
import { calculateRSIs } from "@/lib/rsi";

export const bybitRoute = new Hono();

bybitRoute.get("/kline/get", async (c) => {
  const klines = await getKlines({
    count: 1,
    interval: "3",
    endTimeStamp: Date.now(),
  });
  return c.json(klines as any);
});

bybitRoute.get("/rsi/get", async (c) => {
  // TradingView에서는 200개 봉을 받아서 계산하는 듯하다. 200개로 하면 정확함
  const count = 200;
  const klines = await getKlines({
    count,
    interval: "3",
    endTimeStamp: Date.now(),
  });
  const ohlcAvgPrices = klines
    .map(({ open, high, low, close }) => (open + high + low + close) / 4)
    .reverse();
  const rsiList = calculateRSIs(ohlcAvgPrices);
  return c.json({ rsi: Number(rsiList[rsiList.length - 1].toFixed(2)) });
});

bybitRoute.post(
  "/order/buy",
  zValidator(
    "json",
    z.object({
      position: z.enum(["long", "short"]),
      symbol: z.string(),
      qty: z.coerce.number().positive(),
    }),
  ),
  async (c) => {
    const { position, symbol, qty } = c.req.valid("json");
    const order = await linearOrder({ position, symbol, qty });
    console.debug(`Order: [${position}], symbol: ${symbol}, qty: ${qty}`);
    return c.json(order);
  },
);

bybitRoute.get("/position/get/all", async (c) => {
  const orders = await getPositions();
  return c.json(orders);
});
