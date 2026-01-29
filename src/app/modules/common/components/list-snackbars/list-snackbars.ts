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
  private readonly subL = signal<null | PubSubSubscription>(null);
  readonly messages = signal<Message[]>([]);

  ngOnInit(): void {
    this.getMessages();
  }

  ngOnDestroy(): void {
    this.subL()?.unsubscribe();
  }

  getMessages(): void {
    const sub = this.pubsub.subscribe('snackbar', ({ data, id }) => {
      this.messages.update((messages) => {
        const newType = (data as never)['type'] as 'success' | 'error' | 'warning';
        const newMessage = (data as never)['message'] as string;
        return [...messages, { id, type: newType, message: newMessage }];
      });
    });
    this.subL.set(sub);
  }
}
