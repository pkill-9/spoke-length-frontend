import { TestBed } from '@angular/core/testing';

import { RimService } from './rim.service';

describe('RimService', () => {
  let service: RimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
