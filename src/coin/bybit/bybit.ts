import { RestClientV5 } from "bybit-api";

const bybitClient = new RestClientV5({
  testnet: true,
});

export async function getKline() {
  return bybitClient.getKline({
    category: "inverse",
    symbol: "BTCUSD",
    interval: "60",
    end: Date.now(),
    limit: 1,
  });
}
