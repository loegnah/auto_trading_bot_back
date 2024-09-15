import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
  closePosition,
  getKlines,
  getLeverage,
  getPositions,
  linearOrder,
  setLeverage,
  setTpsl,
} from "@/coin/bybit/bybit";
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
  "/order/linear",
  zValidator(
    "json",
    z.object({
      positionSide: z.enum(["long", "short"]),
      symbol: z.string(),
      qty: z.coerce.number().positive(),
    }),
  ),
  async (c) => {
    const { positionSide, symbol, qty } = c.req.valid("json");
    const order = await linearOrder({ positionSide, symbol, qty });
    console.debug(`Order: [${positionSide}], symbol: ${symbol}, qty: ${qty}`);
    return c.json(order);
  },
);

bybitRoute.post(
  "/order/close",
  zValidator(
    "json",
    z.object({
      symbol: z.string(),
      positionSide: z.enum(["long", "short"]),
    }),
  ),
  async (c) => {
    const { symbol, positionSide } = c.req.valid("json");
    const order = await closePosition({ symbol, positionSide });
    return c.json(order);
  },
);

bybitRoute.get("/position/get/all", async (c) => {
  const orders = await getPositions({ settleCoin: "USDT" });
  orders.result.list.forEach(({ takeProfit, stopLoss }) => {
    console.log(takeProfit, stopLoss);
  });
  return c.json(orders);
});

bybitRoute.get(
  "/leverage/get",
  zValidator("query", z.object({ symbol: z.string() })),
  async (c) => {
    const { symbol } = c.req.valid("query");
    const leverage = await getLeverage({ symbol });
    return c.json({ leverage });
  },
);

bybitRoute.post(
  "/leverage/set",
  zValidator(
    "json",
    z.object({
      symbol: z.string(),
      leverage: z.coerce.number().max(200).min(1),
    }),
  ),
  async (c) => {
    const { symbol, leverage } = c.req.valid("json");
    const preLeverage = await getLeverage({ symbol });
    try {
      const newLeverage = await setLeverage({ symbol, leverage });
      return c.json({ preLeverage, newLeverage });
    } catch (e: any) {
      return c.json({ leverage: preLeverage, error: e.message });
    }
  },
);

bybitRoute.post(
  "/position/tp-sl/set",
  zValidator(
    "json",
    z.object({
      symbol: z.string(),
      takeProfit: z.coerce.number().positive(),
      stopLoss: z.coerce.number().positive(),
    }),
  ),
  async (c) => {
    const { symbol, takeProfit, stopLoss } = c.req.valid("json");
    const ret = await setTpsl({ symbol, takeProfit, stopLoss });
    console.log(ret);
    return c.json(ret);
  },
);
