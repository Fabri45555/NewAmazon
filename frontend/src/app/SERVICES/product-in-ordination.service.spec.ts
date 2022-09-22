import { TestBed } from '@angular/core/testing';

import { ProductInOrdinationService } from './product-in-ordination.service';

describe('ProductInOrdinationService', () => {
  let service: ProductInOrdinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductInOrdinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
