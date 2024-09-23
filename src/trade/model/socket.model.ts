export abstract class TradeSocket {
  protected name: string;

  constructor(params: { name: string }) {
    this.name = params.name;
  }

  abstract subscribeTopics(topics: string[]): void;
}
