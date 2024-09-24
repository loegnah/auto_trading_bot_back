export const CATEGORY = ["bybit"] as const;

export type Category = (typeof CATEGORY)[number];
