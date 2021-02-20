import { TestBed } from '@angular/core/testing';

import { VariousRequestsService } from './various-requests.service';

describe('VariousRequestsService', () => {
  let service: VariousRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariousRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
