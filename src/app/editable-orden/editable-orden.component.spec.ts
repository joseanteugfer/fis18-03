import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableOrdenPagoComponent } from './editable-orden.component';

describe('EditableOrdenPagoComponent', () => {
  let component: EditableOrdenPagoComponent;
  let fixture: ComponentFixture<EditableOrdenPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableOrdenPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableOrdenPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
