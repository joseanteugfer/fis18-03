import { TestBed } from '@angular/core/testing';

import { OrdenPagoService } from './orden.service';

describe('OrdenPagoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdenPagoService = TestBed.get(OrdenPagoService);
    expect(service).toBeTruthy();
  });
});
