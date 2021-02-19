import { TestBed } from '@angular/core/testing';

import { PassMenuDataService } from './pass-menu-data.service';

describe('PassMenuDataService', () => {
  let service: PassMenuDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassMenuDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
