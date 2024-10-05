import { getMockTopics } from "./lib/tradeMock";
import { TradeBot } from "./model/bot.model";
import { TradeSocket } from "./model/socket.model";
import { BybitSocket } from "./socket/bybit.socket";

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
