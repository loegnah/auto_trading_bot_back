import { TradeClient } from "@/trade/model/tradeClient";
import { TradeStrategy } from "@/trade/model/tradeStrategy";

export interface TradeBot {
  name: string;
  active: boolean;
  client: TradeClient;
  strategy: TradeStrategy;

  run: () => Promise<void>;
}
