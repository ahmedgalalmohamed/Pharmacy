import { TestBed } from '@angular/core/testing';

import { AckService } from './ack.service';

describe('AckService', () => {
  let service: AckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
