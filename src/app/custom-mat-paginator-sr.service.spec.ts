import { TestBed } from '@angular/core/testing';

import { CustomMatPaginatorSrService } from './custom-mat-paginator-sr.service';

describe('CustomMatPaginatorSrService', () => {
  let service: CustomMatPaginatorSrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomMatPaginatorSrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
