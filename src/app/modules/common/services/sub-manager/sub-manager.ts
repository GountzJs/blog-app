import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubManager {
  private subscriptions: Subscription[] = [];
  private _isLoading: Record<string, boolean> = {};

  add(sub: Subscription, key: string): void {
    this._isLoading[key] = true;
    this.subscriptions.push(sub);
    sub.add(() => {
      this._isLoading[key] = false;
    });
  }

  destroy(): void {
    this.subscriptions.map((sub) => sub.unsubscribe());
    this.subscriptions = [];
    this._isLoading = {};
  }

  isLoading(key: string): boolean {
    return this._isLoading[key] || false;
  }
}
