import { TestBed } from '@angular/core/testing';

import { HotelsServiceTsService } from './hotels.service.ts.service';

describe('HotelsServiceTsService', () => {
  let service: HotelsServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelsServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
