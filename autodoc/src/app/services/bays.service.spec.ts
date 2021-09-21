import { TestBed } from '@angular/core/testing';

import { BaysService } from './bays.service';

describe('BaysService', () => {
  let service: BaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
