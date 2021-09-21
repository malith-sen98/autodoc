import { TestBed } from '@angular/core/testing';

import { vehAccountService } from './account.service';

describe('vehAccountService', () => {
  let service: vehAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(vehAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
