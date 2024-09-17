import { Elysia, t } from "elysia";
import { BybitClient } from "@/coin/bybit/bybit.client";
import { INTERVAL_LIST } from "@/coin/bybit/bybit.const";
import { bybitManager } from "@/coin/bybit/bybit.manager";
import { env } from "@/lib/env";
import { calculateRSIs } from "@/lib/rsi";

export const bybitPlugin = new Elysia({ prefix: "/bybit", name: "bybit" })
  .decorate({
    BybitClient: new BybitClient({
      apiKey: env.BYBIT_API_KEY,
      apiSecret: env.BYBIT_API_SECRET,
      testnet: !!env.BYBIT_TESTNET,
    }),
    BybitManager: bybitManager,
  })
  .post(
    "/client/register",
    async ({ body, BybitManager }) => {
      const newClientInfo = await BybitManager.registerClient({
        ...body,
        testnet: body.testnet ? 1 : 0,
      });
      return {
        newClientInfo,
      };
    },
    {
      body: t.Object({
        apiKey: t.String(),
        apiSecret: t.String(),
        userId: t.Number(),
        testnet: t.Optional(t.Boolean()),
      }),
    },
  )
  .get(
    "/kline/get",
    async ({ query, BybitClient }) => {
      const klines = await BybitClient.getKlines({
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
    async ({ query, BybitClient }) => {
      const klines = await BybitClient.getKlines({
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
    async ({ body, BybitClient }) => {
      const order = await BybitClient.createOrder({
        ...body,
      });
      return order;
    },
    {
      body: t.Object({
        positionSide: t.Union([t.Literal("long"), t.Literal("short")]),
        orderType: t.Union([t.Literal("Market"), t.Literal("Limit")]),
        symbol: t.String(),
        qty: t.Numeric(),
        price: t.Optional(t.Number()),
        takeProfit: t.Optional(t.Number()),
        stopLoss: t.Optional(t.Number()),
      }),
    },
  )
  .post(
    "/order/close",
    async ({ body, BybitClient }) => {
      const order = await BybitClient.closePosition({
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
  .get("/position/get/all", async ({ BybitClient }) => {
    const orders = await BybitClient.getPositions({ settleCoin: "USDT" });
    return orders;
  })
  .get(
    "/leverage/get",
    async ({ query, BybitClient }) => {
      const leverage = await BybitClient.getLeverage({ symbol: query.symbol });
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
    async ({ body, BybitClient }) => {
      const preLeverage = await BybitClient.getLeverage({
        symbol: body.symbol,
      });
      try {
        const leverage = await BybitClient.setLeverage({
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
    async ({ body, BybitClient }) => {
      const ret = await BybitClient.setTpsl({
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
