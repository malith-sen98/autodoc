import { TestBed } from '@angular/core/testing';

import { ReqstatservicesService } from './reqstatservices.service';

describe('ReqstatservicesService', () => {
  let service: ReqstatservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReqstatservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
