import { Elysia } from "elysia";
import { bybitPlugin } from "./bybit/bybit.plugin";
import { TradeService } from "./trade.service";

export const tradePlugin = new Elysia({ name: "trade" })
  .decorate({
    tradeService: new TradeService(),
  })
  .use(bybitPlugin);
