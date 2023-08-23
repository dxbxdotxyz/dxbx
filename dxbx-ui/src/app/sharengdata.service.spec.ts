import { TestBed } from '@angular/core/testing';

import { SharengdataService } from './sharengdata.service';

describe('SharengdataService', () => {
  let service: SharengdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharengdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
