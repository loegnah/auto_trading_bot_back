import { EventEmitter } from "events";
import { isNull } from "es-toolkit";
import { Candle, candleSchema } from "../trade/lib/candle";
import { Category } from "../trade/lib/category";
import { Topic } from "../trade/lib/topic";

class Channel<T> {
  private emitter = new EventEmitter();

  constructor(private validator: (data: any) => null | T) {}

  makeEventName(category: Category, topic: Topic) {
    return `${category}-${topic}`;
  }

  emit(category: Category, topic: Topic, rawData: T) {
    const data = this.validator(rawData);
    if (isNull(data)) return;
    this.emitter.emit(this.makeEventName(category, topic), data);
  }

  on(category: Category, topic: Topic, handler: (data: T) => void) {
    this.emitter.on(this.makeEventName(category, topic), handler);
  }
}

export const candleChannel = new Channel<Candle>((data) => {
  const result = candleSchema.safeParse(data);
  return result.success ? result.data : null;
});
