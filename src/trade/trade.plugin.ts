import { Elysia } from "elysia";
import { bybitPlugin } from "@/trade/bybit/bybit.plugin";
import { TradeService } from "@/trade/trade.service";

export const tradePlugin = new Elysia({ name: "trade" })
  .decorate({
    tradeService: new TradeService(),
  })
  .use(bybitPlugin);
