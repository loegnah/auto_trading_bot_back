export const TOPIC = ["kline.3.BTCUSDT", "kline.1.BTCUSDT"] as const;
export type Topic = (typeof TOPIC)[number];

export const SOURCE_TYPE = ["close", "ohlc"] as const;
export type SourceType = (typeof SOURCE_TYPE)[number];
