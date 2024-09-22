import { TradeBot } from "@/trade/model/tradeBot.ts";
import { TradeClient } from "@/trade/model/tradeClient";
import { TradeStrategy } from "@/trade/model/tradeStrategy";

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
