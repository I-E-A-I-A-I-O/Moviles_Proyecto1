import { TestBed } from '@angular/core/testing';

import { MenuCreationFunctionsService } from './menu-creation-functions.service';

describe('MenuCreationFunctionsService', () => {
  let service: MenuCreationFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuCreationFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
