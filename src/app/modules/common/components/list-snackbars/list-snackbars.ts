import { PubSub, PubSubSubscription } from '@/core/services/pubsub/pubsub';
import { Snackbar } from '@/modules/common/lib/snackbar/snackbar';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';

interface Message {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
}

@Component({
  selector: 'app-list-snackbars',
  imports: [Snackbar],
  templateUrl: './list-snackbars.html',
  styleUrl: './list-snackbars.css',
})
export class ListSnackbars implements OnInit, OnDestroy {
  private readonly pubsub = inject(PubSub);
  private readonly subscription = signal<null | PubSubSubscription>(null);
  private readonly timeouts = signal<Map<string, number>>(new Map());
  readonly messages = signal<Message[]>([]);

  ngOnInit(): void {
    this.getMessages();
  }

  ngOnDestroy(): void {
    this.subscription()?.unsubscribe();
    this.timeouts().forEach((timeoutId) => clearTimeout(timeoutId));
    this.timeouts().clear();
  }

  private removeMessage(id: string): void {
    const timeoutId = this.timeouts().get(id);

    if (timeoutId) {
      clearTimeout(timeoutId);
      this.timeouts().delete(id);
    }

    this.messages.update((messages) => messages.filter((message) => message.id !== id));
  }

  getMessages(): void {
    const sub = this.pubsub.subscribe<Message>('snackbar', ({ data, id }) => {
      this.messages.update((messages) => [
        ...messages,
        {
          id,
          type: data.type,
          message: data.message,
        },
      ]);

      const timeoutId = setTimeout(() => {
        this.removeMessage(id);
      }, 3000);

      this.timeouts().set(id, timeoutId);
    });

    this.subscription.set(sub);
  }
}
