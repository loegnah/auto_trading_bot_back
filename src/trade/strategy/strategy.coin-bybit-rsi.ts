import { BybitClient } from "@/trade/bybit/bybit.client.ts";
import { calcRsiHistory } from "@/trade/lib/rsi.ts";
import { Interval, SourceType, Topic } from "@/trade/lib/tradeConst.ts";
import { Strategy } from "@/trade/strategy/strategy.ts";

export class StrategyCoinBybitRsi extends Strategy {
  client: BybitClient;
  name: string;
  topics: Topic[];
  private lastRsi: number | null = null;
  private readonly symbol: string;
  private readonly interval: Interval;
  private readonly rsiPeriod: number;
  private readonly sourceType: SourceType;

  constructor({
    name,
    client,
    topics: followTopics,
    sourceType,
    symbol,
    interval,
    period,
  }: {
    name: string;
    client: BybitClient;
    topics: Topic[];
    sourceType: SourceType;
    symbol: string;
    interval: Interval;
    period: number;
  }) {
    super();
    this.name = name;
    this.topics = followTopics;
    this.client = client;
    this.sourceType = sourceType;
    this.symbol = symbol;
    this.interval = interval;
    this.rsiPeriod = period;
    this.init();
  }

  async init() {
    await this.calcInitialRsi();
  }

  async calcInitialRsi() {
    const klines = await this.client.getCandles({
      symbol: this.symbol,
      interval: this.interval,
      count: 200,
      endTimeStamp: Date.now(),
    });

    const prices = klines
      .map((kline) =>
        this.sourceType === "close"
          ? kline.close
          : (kline.open + kline.high + kline.low + kline.close) / 4,
      )
      .reverse();
    const rsiHistory = calcRsiHistory({ prices, period: this.rsiPeriod });
    this.lastRsi = rsiHistory[rsiHistory.length - 1];
  }

  inputData(data: any): Promise<any> {
    return Promise.resolve();
  }
}
