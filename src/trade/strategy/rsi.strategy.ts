import { Candle, CandleTool, SourceType } from "../lib/candle";
import { calcRsi, calcRsiHistory } from "../lib/rsi";
import { Topic } from "../lib/topic";
import { TradeStrategy } from "../model/strategy.model";

export class RsiStrategy extends TradeStrategy {
  private rsiPeriod: number;
  private sourceType: SourceType;
  private lastRsi?: number;
  private lastAvgGain?: number;
  private lastAvgLoss?: number;

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

  async init({ candles }: { candles: Candle[] }) {
    await this.calcInitialRsi(candles);
  }

  private async calcInitialRsi(candles: Candle[]) {
    const prices = candles.map(this.convertCandle).reverse();
    const { rsiList, avgGain, avgLoss } = calcRsiHistory({
      prices,
      period: this.rsiPeriod,
    });
    this.lastRsi = rsiList[rsiList.length - 1];
    this.lastAvgGain = avgGain;
    this.lastAvgLoss = avgLoss;
  }

  private convertCandle(candle: Candle): number {
    return this.sourceType === "close"
      ? candle.close
      : CandleTool.calcOhlc(candle);
  }

  async inputData(candle: Candle) {
    const { rsi, avgGain, avgLoss } = calcRsi({
      prePrice: candle.close,
      price: candle.close,
      period: this.rsiPeriod,
      preAvgGain: this.lastAvgGain ?? 0,
      preAvgLoss: this.lastAvgLoss ?? 0,
    });
    this.lastRsi = rsi;
    this.lastAvgGain = avgGain;
    this.lastAvgLoss = avgLoss;
  }
}
