import { candleChannel } from "../../channel/channel";
import { BybitClient } from "../client/bybit.client";
import { Candle } from "../lib/candle";
import { Topic } from "../lib/topic";
import { TradeBot } from "../model/bot.model";
import { RsiStrategy } from "../strategy/rsi.strategy";

export class BybitRsiBot extends TradeBot {
  protected client: BybitClient;
  protected strategy: RsiStrategy;
  private topic: Topic;

  constructor(params: { name: string; topic: Topic }) {
    super({ name: params.name, active: false });
    this.topic = params.topic;
    this.client = new BybitClient({
      name: "Bybit",
      apiKey: "apiKey",
      apiSecret: "apiSecret",
      testnet: true,
    });
    this.strategy = new RsiStrategy({
      name: "RSI",
      topics: [this.topic],
      sourceType: "ohlc",
      period: 14,
    });
  }

  async init() {
    // TODO: DB에서 active 여부 조회 후 적용
    this.active = true;
    await this.initClient();
    await this.initStrategy();
  }

  async initClient() {
    // TODO: 초기화 로직 추가
  }

  async initStrategy() {
    // TODO: 초기화 로직 추가, candle 추가
    await this.strategy.init({ candles: [] });
  }

  async subscribeChannel() {
    candleChannel.on("bybit", this.topic, (candle) => {
      if (!this.active) return;
      this.inputDataToStrategy(candle);
    });
  }

  async inputDataToStrategy(candle: Candle) {
    this.strategy.inputData(candle);
  }

  async run(): Promise<void> {
    console.log("BotBybitRsi run");
  }
}
