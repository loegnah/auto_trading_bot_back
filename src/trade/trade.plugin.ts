import { Elysia } from "elysia";
import { TradeService } from "./trade.service";

export const tradePlugin = new Elysia({ name: "trade" }).decorate({
  tradeService: new TradeService(),
});
