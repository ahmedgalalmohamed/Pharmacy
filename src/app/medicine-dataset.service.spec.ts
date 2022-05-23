import { TestBed } from '@angular/core/testing';

import { MedicineDatasetService } from './medicine-dataset.service';

describe('NodejsTextService', () => {
  let service: MedicineDatasetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineDatasetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
