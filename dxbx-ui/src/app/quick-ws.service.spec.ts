import { TestBed } from '@angular/core/testing';

import { QuickWSService } from './quick-ws.service';

describe('QuickWSService', () => {
  let service: QuickWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
