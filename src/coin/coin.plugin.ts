import Elysia from "elysia";
import { bybitPlugin } from "@/coin/bybit/bybit.plugin";

export const coinPlugin = new Elysia({ prefix: "/coin", name: "coin" }).use(
  bybitPlugin,
);
