import { WebsocketClient } from "bybit-api";
import { Candle, printCandleData } from "../lib/candle";
import { TradeSocket } from "../model/socket.model";

export class BybitSocket implements TradeSocket {
  name = "bybit";
  private wsClient: WebsocketClient;
  private latestCandleRaw: Candle | null = null;

  constructor() {
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
      const newCandleRaw = res.data[0];
      console.log(res);
      if (
        this.latestCandleRaw &&
        this.latestCandleRaw.start !== newCandleRaw.start
      ) {
        // 업데이트 되었다는 거
        printCandleData(this.latestCandleRaw);
        // TODO: 이벤트 큐에 넣기
      }
      this.latestCandleRaw = newCandleRaw;
    });
  }

  // registerUpdateHandler(handler: (data: any) => any) {
  //   this.wsClient.on("update", handler);
  // }

  subscribeTopics(topics: string[]) {
    this.wsClient.subscribeV5(topics, "linear");
  }
}
