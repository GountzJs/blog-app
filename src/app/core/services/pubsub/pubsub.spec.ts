import { TestBed } from '@angular/core/testing';
import { PubSub } from './pubsub';

describe('PubSub', () => {
  let service: PubSub;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubSub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
