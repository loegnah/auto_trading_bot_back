import { BybitWsClient } from "@/coin/bybit/bybit-ws.client";
import { BybitClient } from "@/coin/bybit/bybit.client";
import { printKlineData } from "@/coin/bybit/bybit.lib";
import { getMockTopics } from "@/coin/bybit/bybit.mock";
import { KlineRaw } from "@/coin/bybit/bybit.type";
import { db } from "@/db";
import { BybitInsert, bybitTable } from "@/schema/bybitSchema";

export class BybitService {
  private wsClient = new BybitWsClient();
  private clients: BybitClient[] = [];
  private lastKlineRaw: KlineRaw | null = null;

  constructor() {
    this.init();
  }

  async init() {
    await this.loadWsClient();
    await this.loadClients();
  }

  private async loadWsClient() {
    this.wsClient.registerUpdateHandler(this.handleUpdate);
    this.wsClient.subscribeTopics(await getMockTopics());
  }

  private async loadClients() {
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

  async registerClient(params: BybitInsert) {
    const newClientInfos = await db
      .insert(bybitTable)
      .values({
        ...params,
      })
      .returning();
    if (!newClientInfos.length) {
      throw new Error("Failed to register client");
    }
    const newClientInfo = newClientInfos[0];
    console.debug(newClientInfo);
    const newClient = new BybitClient({
      apiKey: newClientInfo.apiKey,
      apiSecret: newClientInfo.apiSecret,
      testnet: newClientInfo.testnet === 1,
    });
    this.clients.push(newClient);
    return newClientInfo;
  }
}
