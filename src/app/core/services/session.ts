import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Session {
  private readonly token = signal<string | null>(null);

  constructor() {
    this.token.set(sessionStorage.getItem('token'));
  }

  set(token: string): void {
    sessionStorage.setItem('token', token);
    this.token.set(token);
  }

  get(): string | null {
    return this.token();
  }

  clear(): void {
    sessionStorage.removeItem('token');
    this.token.set(null);
  }

  isAuth(): boolean {
    return !!this.get();
  }
}
