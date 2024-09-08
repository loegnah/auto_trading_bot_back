import { Hono } from "hono";
import { bybitRoute } from "@/coin/bybit/bybitRoute";

export const coinRoute = new Hono();

coinRoute.route("/bybit", bybitRoute);
