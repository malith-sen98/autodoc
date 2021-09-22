import { TestBed } from '@angular/core/testing';

import { AppointservicesService } from './appointservices.service';

describe('AppointservicesService', () => {
  let service: AppointservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
