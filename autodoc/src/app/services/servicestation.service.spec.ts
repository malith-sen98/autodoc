import { TestBed } from '@angular/core/testing';

import { ServicestationService } from './servicestation.service';

describe('ServicestationService', () => {
  let service: ServicestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
