import { Candle, Interval } from "../lib/candle";

export abstract class TradeClient {
  protected name: string;

  constructor(params: { name: string }) {
    this.name = params.name;
  }

  abstract getCandles(params: {
    symbol: string;
    interval: Interval;
    count: number;
    endTimeStamp: number;
  }): Promise<Candle[]>;
}
