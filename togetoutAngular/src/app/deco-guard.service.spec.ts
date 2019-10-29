import { TestBed } from '@angular/core/testing';

import { DecoGuardService } from './deco-guard.service';

describe('DecoGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecoGuardService = TestBed.get(DecoGuardService);
    expect(service).toBeTruthy();
  });
});
