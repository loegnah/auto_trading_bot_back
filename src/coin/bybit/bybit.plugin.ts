import { Elysia, t } from "elysia";
import {
  closePosition,
  getKlines,
  getLeverage,
  getPositions,
  linearOrder,
  setLeverage,
  setTpsl,
} from "@/coin/bybit/bybit";
import { INTERVAL_LIST } from "@/coin/bybit/bybit.const";
import { calculateRSIs } from "@/lib/rsi";

export const bybitPlugin = new Elysia({ prefix: "/bybit" })
  .get(
    "/kline/get",
    async ({ query }) => {
      const klines = await getKlines({
        symbol: query.symbol,
        interval: query.interval,
        count: query.count,
        endTimeStamp: Date.now(),
      });
      return klines;
    },
    {
      query: t.Object({
        symbol: t.String(),
        interval: t.Union(INTERVAL_LIST.map((k) => t.Literal(k))),
        count: t.Number(),
      }),
    },
  )
  .get(
    "/rsi/get",
    async ({ query }) => {
      const klines = await getKlines({
        symbol: query.symbol,
        interval: query.interval,
        count: 200,
        endTimeStamp: Date.now(),
      });
      const ohlcAvgPrices = klines
        .map(({ open, high, low, close }) => (open + high + low + close) / 4)
        .reverse();
      const rsiList = calculateRSIs(ohlcAvgPrices);
      return rsiList;
    },
    {
      query: t.Object({
        symbol: t.String(),
        interval: t.Union(INTERVAL_LIST.map((k) => t.Literal(k))),
      }),
    },
  )
  .post(
    "/order/create",
    async ({ body }) => {
      const order = await linearOrder({
        positionSide: body.positionSide,
        symbol: body.symbol,
        qty: body.qty,
      });
      return order;
    },
    {
      body: t.Object({
        positionSide: t.Union([t.Literal("long"), t.Literal("short")]),
        symbol: t.String(),
        qty: t.Numeric(),
      }),
    },
  )
  .post(
    "/order/close",
    async ({ body }) => {
      const order = await closePosition({
        symbol: body.symbol,
        positionSide: body.positionSide,
      });
      return order;
    },
    {
      body: t.Object({
        symbol: t.String(),
        positionSide: t.Union([t.Literal("long"), t.Literal("short")]),
      }),
    },
  )
  .get("/position/get/all", async () => {
    const orders = await getPositions({ settleCoin: "USDT" });
    return orders;
  })
  .get(
    "/leverage/get",
    async ({ query }) => {
      const leverage = await getLeverage({ symbol: query.symbol });
      return { leverage };
    },
    {
      query: t.Object({
        symbol: t.String(),
      }),
    },
  )
  .post(
    "/leverage/set",
    async ({ body }) => {
      const preLeverage = await getLeverage({ symbol: body.symbol });
      try {
        const leverage = await setLeverage({
          symbol: body.symbol,
          leverage: body.leverage,
        });
        return { preLeverage, newLeverage: leverage };
      } catch (e: any) {
        return { preLeverage, error: e.message };
      }
    },
    {
      body: t.Object({
        symbol: t.String(),
        leverage: t.Number({
          maximum: 100,
          minimum: 1,
        }),
      }),
    },
  )
  .post(
    "/position/tp-sl/set",
    async ({ body }) => {
      const ret = await setTpsl({
        symbol: body.symbol,
        takeProfit: body.takeProfit,
        stopLoss: body.stopLoss,
      });
      return ret;
    },
    {
      body: t.Object({
        symbol: t.String(),
        takeProfit: t.Number({
          minimum: 0,
        }),
        stopLoss: t.Number({
          minimum: 0,
        }),
      }),
    },
  );
