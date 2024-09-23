import { TradeClient } from "./tradeClient";
import { TradeStrategy } from "./tradeStrategy";

export interface TradeBot {
  name: string;
  active: boolean;
  client: TradeClient;
  strategy: TradeStrategy;

  run: () => Promise<void>;
}
