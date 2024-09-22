export const TOPIC = ["kline.3.BTCUSDT", "kline.1.BTCUSDT"] as const;
export type Topic = (typeof TOPIC)[number];

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

export const CANDLE_FIELDS = ["start", "open", "high", "low", "close"] as const;
