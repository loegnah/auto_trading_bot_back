import { TradeClient } from "./client.model";
import { TradeStrategy } from "./strategy.model";

export abstract class TradeBot {
  protected name: string;
  protected active: boolean;
  protected client: TradeClient;
  protected strategy: TradeStrategy;

  constructor(params: {
    name: string;
    active: boolean;
    client: TradeClient;
    strategy: TradeStrategy;
  }) {
    this.name = params.name;
    this.active = params.active;
    this.client = params.client;
    this.strategy = params.strategy;
  }

  abstract run(): Promise<void>;
}
