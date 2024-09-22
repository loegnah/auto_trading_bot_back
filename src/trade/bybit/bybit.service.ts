import { db } from "@/db.ts";
import { ClientInsert, clientTable } from "@/schema/clientSchema.ts";
import { BybitClient } from "@/trade/bybit/bybit.client.ts";
import { BybitSocket } from "@/trade/bybit/bybit.socket.ts";
import { printCandleData } from "@/trade/lib/print.ts";
import { getMockTopics } from "@/trade/lib/tradeMock.ts";
import { CandleRaw } from "@/trade/lib/tradeType.ts";
import { StrategyCoinBybitRsi } from "@/trade/strategy/strategy.coin-bybit-rsi.ts";
import { Strategy } from "@/trade/strategy/strategy.ts";

export class BybitService {
  private wsClient = new BybitSocket();
  private clients: BybitClient[] = [];
  private strategies: Strategy[] = [];
  private lastKlineRaw: CandleRaw | null = null;

  constructor() {
    this.init();
  }

  async init() {
    await this.loadWsClient();
    await this.loadClients();
    await this.loadStrategies();
  }

  private async loadWsClient() {
    this.wsClient.registerUpdateHandler(this.handleUpdate);
    this.wsClient.subscribeTopics(await getMockTopics());
  }

  private async loadClients() {
    const clientInfos = await db.query.clientTable.findMany();
    this.clients = clientInfos.map(
      (info) =>
        new BybitClient({
          apiKey: info.apiKey,
          apiSecret: info.apiSecret,
          testnet: info.testnet,
        }),
    );
  }

  private async loadStrategies() {
    this.strategies.push(
      new StrategyCoinBybitRsi({
        name: "RSI",
        client: this.clients.filter((c) => !c.testnet)[0],
        topics: ["kline.3.BTCUSDT"],
        sourceType: "ohlc",
        symbol: "BTCUSDT",
        interval: "3",
        period: 14,
      }),
    );
  }

  private async handleUpdate(res: any) {
    const newKlineRaw = res.data[0];
    if (this.lastKlineRaw && this.lastKlineRaw.start !== newKlineRaw.start) {
      printCandleData(this.lastKlineRaw);
      // TODO: 새 캔들 생성됨. RSI 계산 등 알고리즘 적용
    }
    this.lastKlineRaw = newKlineRaw;
  }

  async registerClient(params: ClientInsert) {
    const newClientInfos = await db
      .insert(clientTable)
      .values({
        ...params,
      })
      .returning();
    if (!newClientInfos.length) {
      throw new Error("Failed to register client");
    }
    const newClientInfo = newClientInfos[0];
    const newClient = new BybitClient({
      apiKey: newClientInfo.apiKey,
      apiSecret: newClientInfo.apiSecret,
      testnet: newClientInfo.testnet,
    });
    this.clients.push(newClient);
    return newClientInfo;
  }
}
