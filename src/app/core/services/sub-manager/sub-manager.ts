import { Injectable, signal } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubManager {
  private readonly subscriptions = signal<Subscription[]>([]);
  private readonly _isLoading = signal<Record<string, boolean>>({});

  add(sub: Subscription, key: string): void {
    this._isLoading.update((isLoading) => ({
      ...isLoading,
      [key]: true,
    }));

    this.subscriptions.set([...this.subscriptions(), sub]);

    sub.add(() => {
      this._isLoading.update((isLoading) => ({
        ...isLoading,
        [key]: false,
      }));
    });
  }

  isLoading(key: string): boolean {
    const listLoading = this._isLoading();
    return listLoading[key] || false;
  }

  destroy(): void {
    this.subscriptions().map((sub) => sub.unsubscribe());
    this.subscriptions.set([]);
    this._isLoading.set({});
  }
}
