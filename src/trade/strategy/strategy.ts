import { Topic } from "@/trade/lib/tradeConst.ts";

export abstract class Strategy {
  abstract name: string;
  abstract client: any;
  abstract topics: Topic[];

  abstract init(): Promise<void>;
  abstract inputData(topic: Topic, data: any): Promise<any>;
}
