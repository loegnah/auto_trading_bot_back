import { BybitClient } from "@/trade/bybit/bybit.client.ts";
import { calcRsiHistory } from "@/trade/lib/rsi.ts";
import { Interval, SourceType, Topic } from "@/trade/lib/tradeConst.ts";
import { TradeClient } from "@/trade/model/tradeClient.ts";
import { TradeStrategy } from "@/trade/model/tradeStrategy.ts";

export class StrategyRsi implements TradeStrategy {
  client: TradeClient;
  name: string;
  topics: Topic[];
  private lastRsi: number | null = null;
  private symbol: string;
  private interval: Interval;
  private rsiPeriod: number;
  private sourceType: SourceType;

  constructor(params: {
    name: string;
    client: BybitClient;
    topics: Topic[];
    sourceType: SourceType;
    symbol: string;
    interval: Interval;
    period: number;
  }) {
    this.name = params.name;
    this.topics = params.topics;
    this.client = params.client;
    this.sourceType = params.sourceType;
    this.symbol = params.symbol;
    this.interval = params.interval;
    this.rsiPeriod = params.period;
    this.init();
  }

  async init() {
    await this.calcInitialRsi();
  }

  async calcInitialRsi() {
    const candles = await this.client.getCandles({
      symbol: this.symbol,
      interval: this.interval,
      count: 200,
      endTimeStamp: Date.now(),
    });

    const prices = candles
      .map((candle) =>
        this.sourceType === "close"
          ? candle.close
          : (candle.open + candle.high + candle.low + candle.close) / 4,
      )
      .reverse();
    const rsiHistory = calcRsiHistory({ prices, period: this.rsiPeriod });
    this.lastRsi = rsiHistory[rsiHistory.length - 1];
  }

  inputData(data: any): Promise<any> {
    return Promise.resolve();
  }
}
