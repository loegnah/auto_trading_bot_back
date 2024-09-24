import { EventEmitter } from "events";
import { Topic } from "../trade/lib/topic";
import { Category } from "../trade/lib/category";

class TopicChannel {
  private emitter = new EventEmitter();

  makeEventName(category: Category, topic: Topic) {
    return `${category}-${topic}`;
  }

  emit(category: Category, topic: Topic, data: any) {
    this.emitter.emit(this.makeEventName(category, topic), data);
  }

  on(category: Category, topic: Topic, handler: (data: any) => void) {
    this.emitter.on(this.makeEventName(category, topic), handler);
  }
}

export const topicChannel = new TopicChannel();
