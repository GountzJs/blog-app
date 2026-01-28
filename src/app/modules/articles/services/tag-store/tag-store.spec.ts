import { TestBed } from '@angular/core/testing';
import { TagStore } from './tag-store';

describe('TagStore', () => {
  let service: TagStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
