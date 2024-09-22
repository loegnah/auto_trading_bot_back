import { BybitSocket } from "@/trade/bybit/bybit.socket";
import { printCandleData } from "@/trade/lib/print.ts";
import { getMockTopics } from "@/trade/lib/tradeMock.ts";
import { TradeBot } from "@/trade/model/tradeBot";
import { TradeSocket } from "@/trade/model/tradeSocket";

export class TradeService {
  private sockets: TradeSocket[] = [new BybitSocket()];
  private bots: TradeBot[] = [];

  constructor() {
    this.init();
  }

  async init() {
    await this.loadSockets();
    await this.loadBots();
  }

  private async loadSockets() {
    // TODO: 구독할 토픽들 모아
    // this.sockets.subscribeTopics(await getMockTopics());
    const topics = await getMockTopics();
    this.sockets.forEach((socket) => {
      socket.subscribeTopics(topics);
    });
  }

  private async loadBots() {
    // TODO: Implement
  }
}
