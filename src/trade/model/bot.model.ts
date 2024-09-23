import { TradeClient } from "./client.model";
import { TradeStrategy } from "./strategy.model";

export interface TradeBot {
  name: string;
  active: boolean;
  client: TradeClient;
  strategy: TradeStrategy;

  run: () => Promise<void>;
}
