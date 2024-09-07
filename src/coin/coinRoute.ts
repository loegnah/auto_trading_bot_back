import dayjs from "dayjs";
import { Hono } from "hono";
import { getBybitServerTime, getKline } from "@/coin/bybit/bybit";

export const coinRoute = new Hono();

coinRoute.get("/dev/kline/get", async (c) => {
  const kline = await getKline();
  return c.json(kline);
});

coinRoute.get("/dev/getServerTime", async (c) => {
  const serverTime = await getBybitServerTime();
  return c.json({
    ...serverTime,
    myTime: {
      second: dayjs().unix(),
      millisecond: dayjs().valueOf(),
    },
  });
});
