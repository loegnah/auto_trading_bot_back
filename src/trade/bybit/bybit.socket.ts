import { WebsocketClient } from "bybit-api";
import { topicChannel } from "../../channel/topic.channel";
import { Candle, CandleRaw, printCandleData } from "../lib/candle";
import { Topic } from "../lib/topic";
import { TradeSocket } from "../model/socket.model";

export class BybitSocket extends TradeSocket {
  private wsClient: WebsocketClient;

  private latestCandleRaw: { [K in Topic]?: CandleRaw } = {};

  constructor() {
    super({ name: "bybit" });
    this.wsClient = new WebsocketClient({
      market: "v5",
    });
    this.initHandler();
  }

  private initHandler() {
    this.wsClient.on("close", () => {
      console.error("[bybit-ws] connection closed");
    });
    this.wsClient.on("error", (error) => {
      console.error("[bybit-ws] connection error", error);
    });
    this.wsClient.on("update", (res) => {
      const topic: Topic | undefined = res.topic;
      if (!topic) return;
      const preCandleRaw = this.latestCandleRaw[topic];
      const newCandleRaw = res.data[0];

      if (preCandleRaw && preCandleRaw.start !== newCandleRaw.start) {
        topicChannel.emit("bybit", res.topic, { topic, preCandleRaw });
      }
      this.latestCandleRaw[topic] = newCandleRaw;
    });
  }


  subscribeTopics(topics: string[]) {
    this.wsClient.subscribeV5(topics, "linear");
  }
}
