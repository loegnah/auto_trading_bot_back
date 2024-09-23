import { TradeBot } from "../model/bot.model";
import { TradeClient } from "../model/client.model";
import { TradeStrategy } from "../model/strategy.model";

export class BybitRsiBot extends TradeBot {
  constructor(params: {
    name: string;
    active: boolean;
    client: TradeClient;
    strategy: TradeStrategy;
  }) {
    super(params);
  }

  async run(): Promise<void> {
    console.log("BotBybitRsi run");
  }
}
