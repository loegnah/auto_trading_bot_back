import { Hono } from "hono";
import { getKline } from "@/coin/bybit/bybit";

export const coinRoute = new Hono();

coinRoute.get("/dev/kline/get", async (c) => {
  const kline = await getKline();
  console.log(kline);
  return c.json(kline);
});
