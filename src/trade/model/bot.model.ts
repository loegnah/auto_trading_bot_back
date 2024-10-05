import { TradeClient } from "./client.model";
import { TradeStrategy } from "./strategy.model";

export abstract class TradeBot {
  protected name: string;
  protected active: boolean;
  protected abstract client: TradeClient;
  protected abstract strategy: TradeStrategy;

  constructor(params: { name: string; active: boolean }) {
    this.name = params.name;
    this.active = params.active;
  }

  abstract subscribeChannel(): void;

  abstract inputDataToStrategy(data: any): void;

  abstract run(): Promise<void>;
}
