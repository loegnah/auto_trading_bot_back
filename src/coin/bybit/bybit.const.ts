import { KlineIntervalV3 } from "bybit-api";

export const INTERVAL_LIST: KlineIntervalV3[] = [
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
