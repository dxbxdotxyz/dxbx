import { TestBed } from '@angular/core/testing';

import { AptosWalletService } from './aptos-wallet.service';

describe('AptosWalletService', () => {
  let service: AptosWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AptosWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
