import { z } from "zod";

export const CANDLE_FIELDS = ["start", "open", "high", "low", "close"] as const;
export type CandleFields = (typeof CANDLE_FIELDS)[number];

export const candleSchema = z.object({
  start: z.number(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
});

export type Candle = z.infer<typeof candleSchema>;

export const candleRawSchema = z.object({
  start: z.string(),
  open: z.string(),
  high: z.string(),
  low: z.string(),
  close: z.string(),
});

export type CandleRaw = z.infer<typeof candleRawSchema>;

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
