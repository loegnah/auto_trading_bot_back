import { WebsocketClient } from "bybit-api";
import dayjs from "dayjs";

const KLINE_FIELDS = ["start", "open", "high", "low", "close"] as const;
const TOPICS = ["kline.3.BTCUSDT"];

export class BybitWsService {
  private readonly wsClient: WebsocketClient;
  private lastKlineData: any = null;

  constructor() {
    this.wsClient = new WebsocketClient({
      market: "v5",
    });
    this.registerHandler();
    this.wsClient.subscribeV5(TOPICS, "linear");
  }

  private registerHandler() {
    this.wsClient.on("update", (data) => {
      if (
        this.lastKlineData &&
        this.lastKlineData.start !== data.data[0].start
      ) {
        this.printKlineData(data.data[0]);
      }
      this.lastKlineData = data.data[0];
    });

    this.wsClient.on("open", (data) => {
      console.log("connection opened open:", data.wsKey);
    });
    this.wsClient.on("response", (_data) => {
      // console.log("log response: ", JSON.stringify(data, null, 2));
    });
    this.wsClient.on("reconnect", ({ wsKey }) => {
      console.log("ws automatically reconnecting.... ", wsKey);
    });
    this.wsClient.on("reconnected", (data) => {
      console.log("ws has reconnected ", data?.wsKey);
    });
  }

  private printKlineData(data: any) {
    const timeFormatSeoul = dayjs(data.start)
      .tz("Asia/Seoul")
      .format("YYYY-MM-DD HH:mm:ss");
    const printList: string[] = KLINE_FIELDS.map(
      (field) => `${field}: ${data[field]}`,
    );
    console.log("----------------------------------------");
    console.log(timeFormatSeoul);
    console.log(printList.join("\n"));
    console.log("----------------------------------------");
  }
}
