import { TestBed } from '@angular/core/testing';

import { LieuService } from './lieu.service';

describe('LieuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LieuService = TestBed.get(LieuService);
    expect(service).toBeTruthy();
  });
});
