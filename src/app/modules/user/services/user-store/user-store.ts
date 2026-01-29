import { UserData } from '@/modules/user/models/types/user-data.type';
import { Injectable, signal } from '@angular/core';

@Injectable()
export class UserStore {
  private data = signal<UserData | null>(null);

  get(): UserData | null {
    return this.data();
  }

  set(data: UserData): void {
    this.data.set(data);
  }

  clear(): void {
    this.data.set(null);
  }
}
