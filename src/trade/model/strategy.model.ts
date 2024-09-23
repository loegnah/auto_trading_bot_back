import { Topic } from "../lib/topic";
import { TradeClient } from "./client.model";

export abstract class TradeStrategy {
  protected name: string;
  protected client: TradeClient;
  protected topics: Topic[];

  constructor(params: { name: string; client: TradeClient; topics: Topic[] }) {
    this.name = params.name;
    this.client = params.client;
    this.topics = params.topics;
  }

  abstract init(): Promise<void>;
  abstract inputData(topic: Topic, data: any): Promise<any>;
}
