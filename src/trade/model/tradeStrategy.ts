import { Topic } from "@/trade/lib/tradeConst.ts";
import { TradeClient } from "@/trade/model/tradeClient.ts";

export interface TradeStrategy {
  name: string;
  client: TradeClient;
  topics: Topic[];

  init(): Promise<void>;
  inputData(topic: Topic, data: any): Promise<any>;
}
