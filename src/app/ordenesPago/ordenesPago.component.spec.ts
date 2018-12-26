import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesPagoComponent } from './ordenesPago.component';

describe('OrdenesPagoComponent', () => {
  let component: OrdenesPagoComponent;
  let fixture: ComponentFixture<OrdenesPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
