import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { isNotAuthenticateGuard } from './is-not-authenticate-guard';

describe('isNotAuthenticateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isNotAuthenticateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
