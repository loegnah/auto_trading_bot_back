import { Topic } from "../lib/topic";
import { TradeClient } from "./tradeClient";

export interface TradeStrategy {
  name: string;
  client: TradeClient;
  topics: Topic[];

  init(): Promise<void>;
  inputData(topic: Topic, data: any): Promise<any>;
}
