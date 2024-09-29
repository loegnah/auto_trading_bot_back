import { EventEmitter } from "events";
import { Candle } from "../trade/lib/candle";
import { Category } from "../trade/lib/category";
import { Topic } from "../trade/lib/topic";

class Channel<T> {
  private emitter = new EventEmitter();

  makeEventName(category: Category, topic: Topic) {
    return `${category}-${topic}`;
  }

  emit(category: Category, topic: Topic, candle: T) {
    this.emitter.emit(this.makeEventName(category, topic), candle);
  }

  on(category: Category, topic: Topic, handler: (candle: T) => void) {
    this.emitter.on(this.makeEventName(category, topic), handler);
  }
}

export const candleChannel = new Channel<Candle>();
