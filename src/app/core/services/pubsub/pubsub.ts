// pubsub.service.ts
import { computed, Injectable, signal, Signal } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PubSubMessage<T = any> {
  topic: string;
  data: T;
  timestamp: number;
  id: string;
}

export interface PubSubSubscription {
  unsubscribe(): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SubscriberCallback<T = any> = (message: PubSubMessage<T>) => void;

@Injectable({
  providedIn: 'root',
})
export class PubSub {
  private messagesSignal = signal<Map<string, PubSubMessage>>(new Map());
  private subscribers = new Map<string, Set<SubscriberCallback>>();
  private historySignal = signal<PubSubMessage[]>([]);
  private maxHistorySize = 100;

  publish<T>(topic: string, data: T): void {
    const message: PubSubMessage<T> = {
      topic,
      data,
      timestamp: Date.now(),
      id: this.generateId(),
    };

    this.messagesSignal.update((messages) => {
      const newMessages = new Map(messages);
      newMessages.set(topic, message);
      return newMessages;
    });

    this.historySignal.update((history) => {
      const newHistory = [...history, message];
      if (newHistory.length > this.maxHistorySize) {
        newHistory.shift();
      }
      return newHistory;
    });

    const topicSubscribers = this.subscribers.get(topic);
    if (topicSubscribers) {
      topicSubscribers.forEach((callback) => {
        try {
          callback(message);
        } catch (error) {
          console.error(`[PubSub] Error en subscriber de topic "${topic}":`, error);
        }
      });
    }
  }

  subscribe<T>(topic: string, callback: SubscriberCallback<T>): PubSubSubscription {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, new Set());
    }

    this.subscribers.get(topic)!.add(callback as SubscriberCallback);

    return {
      unsubscribe: () => {
        const topicSubscribers = this.subscribers.get(topic);
        if (topicSubscribers) {
          topicSubscribers.delete(callback as SubscriberCallback);
          if (topicSubscribers.size === 0) {
            this.subscribers.delete(topic);
          }
        }
      },
    };
  }

  getTopicSignal<T>(topic: string): Signal<PubSubMessage<T> | undefined> {
    return computed(() => {
      const messages = this.messagesSignal();
      return messages.get(topic) as PubSubMessage<T> | undefined;
    });
  }

  getTopicData<T>(topic: string): Signal<T | undefined> {
    return computed(() => {
      const message = this.messagesSignal().get(topic) as PubSubMessage<T> | undefined;
      return message?.data;
    });
  }

  getTopicHistory<T>(topic: string): Signal<PubSubMessage<T>[]> {
    return computed(() => {
      return this.historySignal().filter((msg) => msg.topic === topic) as PubSubMessage<T>[];
    });
  }

  getHistory(): Signal<PubSubMessage[]> {
    return computed(() => this.historySignal());
  }

  clearHistory(): void {
    this.historySignal.set([]);
  }

  clearTopic(topic: string): void {
    this.messagesSignal.update((messages) => {
      const newMessages = new Map(messages);
      newMessages.delete(topic);
      return newMessages;
    });
  }

  getSubscriberCount(topic: string): number {
    return this.subscribers.get(topic)?.size || 0;
  }

  getActiveTopics(): string[] {
    return Array.from(this.subscribers.keys());
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
