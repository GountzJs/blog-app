import { UserData } from '@/modules/common/models/types/user-data.type';
import { Injectable } from '@angular/core';

@Injectable()
export class User {
  private data: UserData | null = null;

  get(): UserData | null {
    return this.data;
  }

  set(data: UserData): void {
    this.data = data;
  }
}
