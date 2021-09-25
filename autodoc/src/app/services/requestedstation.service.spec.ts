import { TestBed } from '@angular/core/testing';

import { RequestedstationService } from './requestedstation.service';

describe('RequestedstationService', () => {
  let service: RequestedstationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestedstationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
