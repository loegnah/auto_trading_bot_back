import { Interval } from "../lib/tradeConst";
import { Candle } from "../lib/tradeType";

export interface TradeClient {
  name: string;

  getCandles(params: {
    symbol: string;
    interval: Interval;
    count: number;
    endTimeStamp: number;
  }): Promise<Candle[]>;
}
