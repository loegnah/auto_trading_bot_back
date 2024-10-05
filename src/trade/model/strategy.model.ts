import { Topic } from "../lib/topic";

export abstract class TradeStrategy {
  protected name: string;
  protected topics: Topic[];

  constructor(params: { name: string; topics: Topic[] }) {
    this.name = params.name;
    this.topics = params.topics;
  }

  abstract inputData(data: any): any;
}
