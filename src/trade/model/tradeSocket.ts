export interface TradeSocket {
  name: string;

  subscribeTopics(topics: string[]): void;
}
