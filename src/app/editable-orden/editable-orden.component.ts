import { Component, OnInit, Input } from '@angular/core';
import { OrdenPago } from '../orden';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-editable-orden]',
  templateUrl: './editable-orden.component.html',
  styleUrls: ['./editable-orden.component.css']
})
export class EditableOrdenPagoComponent implements OnInit {

  @Input() orden: OrdenPago;
  editable = false;

  constructor() { }


  onEdit() {
    this.editable = ! this.editable;
  }

  ngOnInit() {
  }

}
