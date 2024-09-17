import { BybitWsClient } from "@/coin/bybit/bybit-ws.client";
import { BybitClient } from "@/coin/bybit/bybit.client";
import { printKlineData } from "@/coin/bybit/bybit.lib";
import { getMockClientAuths, getMockTopics } from "@/coin/bybit/bybit.mock";
import { KlineRaw } from "@/coin/bybit/bybit.type";

export class BybitManager {
  private wsClient = new BybitWsClient();
  private clients: BybitClient[] = [];
  private lastKlineRaw: KlineRaw | null = null;

  constructor() {
    this.init();
  }

  async init() {
    const clientAuths = await getMockClientAuths();
    this.clients = clientAuths.map((auth) => new BybitClient(auth));

    this.wsClient.registerUpdateHandler(this.handleUpdate);

    const topics = await getMockTopics();
    this.wsClient.subscribeTopics(topics);
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
