export const TOPIC = [
  "kline.3.BTCUSDT",
  "kline.1.BTCUSDT",
  "kline.3.ETHUSDT",
] as const;

export type Topic = (typeof TOPIC)[number];
