import { Candle, Interval } from "../lib/candle";

export interface TradeClient {
  name: string;

  getCandles(params: {
    symbol: string;
    interval: Interval;
    count: number;
    endTimeStamp: number;
  }): Promise<Candle[]>;
}
