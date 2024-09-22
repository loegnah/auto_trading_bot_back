import { Interval } from "@/trade/lib/tradeConst.ts";
import { Candle } from "@/trade/lib/tradeType.ts";

export interface TradeClient {
  name: string;

  getCandles(params: {
    symbol: string;
    interval: Interval;
    count: number;
    endTimeStamp: number;
  }): Promise<Candle[]>;
}
