import { TradeBot } from "../model/bot.model";
import { TradeClient } from "../model/client.model";
import { TradeStrategy } from "../model/strategy.model";

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
