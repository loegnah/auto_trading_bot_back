import { Candle, candleSchema, Interval, SourceType } from "../lib/candle";
import { calcRsiHistory } from "../lib/rsi";
import { Topic } from "../lib/topic";
import { TradeStrategy } from "../model/strategy.model";

export class RsiStrategy extends TradeStrategy {
  private lastRsi: number | null = null;
  private rsiPeriod: number;
  private sourceType: SourceType;

  constructor(params: {
    name: string;
    topics: Topic[];
    sourceType: SourceType;
    period: number;
  }) {
    super(params);
    this.sourceType = params.sourceType;
    this.rsiPeriod = params.period;
  }

  async calcInitialRsi(candles: Candle[]) {
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

  async inputData(candle: Candle) {
    // pass
  }
}
