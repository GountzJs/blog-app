import { Injectable, signal } from '@angular/core';

@Injectable()
export class TagStore {
  private readonly tag = signal<string | undefined>(undefined);

  get(): string | undefined {
    return this.tag();
  }

  set(tag: string) {
    this.tag.set(tag);
  }
}
