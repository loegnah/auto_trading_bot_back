import { sum } from "es-toolkit";

function rsi(avgGain: number, avgLoss: number) {
  return 100 - 100 / (1 + avgGain / avgLoss);
}

export function calcRsiHistory({
  prices,
  period,
}: {
  prices: number[];
  period: number;
}): { rsiList: number[]; avgGain: number; avgLoss: number } {
  const changes = prices.slice(1).map((price, index) => price - prices[index]);
  const gains = changes.map((change) => Math.max(change, 0));
  const losses = changes.map((change) => Math.abs(Math.min(change, 0)));

  let avgGain = sum(gains.slice(0, period)) / period;
  let avgLoss = sum(losses.slice(0, period)) / period;
  const rsiList = [rsi(avgGain, avgLoss)];

  for (let i = period; i < changes.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
    rsiList.push(rsi(avgGain, avgLoss));
  }
  return { rsiList, avgGain, avgLoss };
}

export function calcRsi({
  prePrice,
  price,
  period,
  preAvgGain,
  preAvgLoss,
}: {
  prePrice: number;
  price: number;
  period: number;
  preAvgGain: number;
  preAvgLoss: number;
}): { rsi: number; avgGain: number; avgLoss: number } {
  const change = price - prePrice;
  const gain = Math.max(change, 0);
  const loss = Math.abs(Math.min(change, 0));
  const avgGain = (preAvgGain * (period - 1) + gain) / period;
  const avgLoss = (preAvgLoss * (period - 1) + loss) / period;
  return { rsi: rsi(avgGain, avgLoss), avgGain, avgLoss };
}
