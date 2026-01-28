import { TestBed } from '@angular/core/testing';
import { SubManager } from './sub-manager';

describe('SubManager', () => {
  let service: SubManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
