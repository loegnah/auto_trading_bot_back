import { TradeBot } from "../model/tradeBot";
import { TradeClient } from "../model/tradeClient";
import { TradeStrategy } from "../model/tradeStrategy";

export class BybitRsiBot implements TradeBot {
  name: string;
  active: boolean;
  client: TradeClient;
  strategy: TradeStrategy;

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

  async run() {
    console.log("BotBybitRsi run");
  }
}
