import { TestBed } from '@angular/core/testing';

import { ServicestationservicesService } from './servicestationservices.service';

describe('ServicestationservicesService', () => {
  let service: ServicestationservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicestationservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
