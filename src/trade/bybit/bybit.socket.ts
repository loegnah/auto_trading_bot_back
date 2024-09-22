import { WebsocketClient } from "bybit-api";

export class BybitSocket {
  private readonly wsClient: WebsocketClient;

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
  }

  registerUpdateHandler(handler: (data: any) => any) {
    this.wsClient.on("update", handler);
  }

  subscribeTopics(topics: string[]) {
    this.wsClient.subscribeV5(topics, "linear");
  }
}
