import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Session {
  set(token: string): void {
    sessionStorage.setItem('token', token);
  }

  get(): string | null {
    return sessionStorage.getItem('token');
  }

  clear(): void {
    sessionStorage.removeItem('token');
  }

  isAuth(): boolean {
    return !!this.get();
  }
}
