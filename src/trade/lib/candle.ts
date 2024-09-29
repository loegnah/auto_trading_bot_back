export const CANDLE_FIELDS = ["start", "open", "high", "low", "close"] as const;
export type CandleFields = (typeof CANDLE_FIELDS)[number];

export type Candle = {
  start: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type CandleRaw = {
  start: string;
  open: string;
  high: string;
  low: string;
  close: string;
};

export const SOURCE_TYPE = ["close", "ohlc"] as const;
export type SourceType = (typeof SOURCE_TYPE)[number];

export const INTERVAL = [
  "1",
  "3",
  "5",
  "15",
  "30",
  "60",
  "120",
  "240",
  "360",
  "720",
  "D",
  "W",
  "M",
] as const;
export type Interval = (typeof INTERVAL)[number];

export function printCandleData(candle: CandleRaw | Candle) {
  const printList: string[] = CANDLE_FIELDS.map(
    (field) => `${field}: ${candle[field]}`,
  );
  console.log("----------------------------------------");
  console.log(printList.join("\n"));
  console.log("----------------------------------------");
}

export function convertCandleRawToCandle(candleRaw: CandleRaw): Candle {
  return {
    start: Number(candleRaw.start),
    open: Number(candleRaw.open),
    high: Number(candleRaw.high),
    low: Number(candleRaw.low),
    close: Number(candleRaw.close),
  };
}
