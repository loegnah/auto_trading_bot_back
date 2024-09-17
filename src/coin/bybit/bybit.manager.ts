import { BybitWsClient } from "@/coin/bybit/bybit-ws.client";
import { BybitClient } from "@/coin/bybit/bybit.client";
import { printKlineData } from "@/coin/bybit/bybit.lib";
import { getMockTopics } from "@/coin/bybit/bybit.mock";
import { KlineRaw } from "@/coin/bybit/bybit.type";
import { db } from "@/db";

export class BybitManager {
  private wsClient: BybitWsClient;
  private clients: BybitClient[] = [];
  private lastKlineRaw: KlineRaw | null = null;

  constructor() {
    this.init();
  }

  async init() {
    await this.initClients();
    await this.initWsClient();
  }

  private async initWsClient() {
    this.wsClient = new BybitWsClient();
    this.wsClient.registerUpdateHandler(this.handleUpdate);
    this.wsClient.subscribeTopics(await getMockTopics());
  }

  private async initClients() {
    const clientInfos = await db.query.bybitTable.findMany();
    this.clients = clientInfos.map(
      (info) =>
        new BybitClient({
          apiKey: info.apiKey,
          apiSecret: info.apiSecret,
          testnet: info.testnet === 1,
        }),
    );
  }

  private async handleUpdate(res: any) {
    const newKlineRaw = res.data[0];
    if (this.lastKlineRaw && this.lastKlineRaw.start !== newKlineRaw.start) {
      printKlineData(this.lastKlineRaw);
      // TODO: 새 캔들 생성됨. RSI 계산 등 알고리즘 적용
    }
    this.lastKlineRaw = newKlineRaw;
  }
}
