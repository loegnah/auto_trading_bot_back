import { RestClientV5 } from "bybit-api";

const bybit = new RestClientV5({
  testnet: true,
});

export async function getKline() {
  return bybit.getKline({
    category: "inverse",
    symbol: "BTCUSD",
    interval: "60",
    end: Date.now(),
    limit: 1,
  });
}

export async function getBybitServerTime() {
  return bybit.getServerTime();
}
