import { TestBed } from '@angular/core/testing';

import { VerifySessionService } from './verify-session.service';

describe('VerifySessionService', () => {
  let service: VerifySessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifySessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
