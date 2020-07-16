import { TestBed } from '@angular/core/testing';

import { BackendserviceService } from './backendservice.service';

describe('BackendserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendserviceService = TestBed.get(BackendserviceService);
    expect(service).toBeTruthy();
  });
});
