import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrdenPago } from '../orden';
import { OrdenPagoService } from '../orden.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-editable-orden]',
  templateUrl: './editable-orden.component.html',
  styleUrls: ['./editable-orden.component.css']
})
export class EditableOrdenPagoComponent implements OnInit {

  @Input('orden') orden: OrdenPago;
  @Input('key') key: string;
  @Output() actualizaOrdenes = new EventEmitter<string>();

 



  editable = false;


  constructor(private ordenService: OrdenPagoService) { }


  onEdit() {
    this.editable = !this.editable;
    if (this.editable === false) {
      this.ordenService.editOrdenPago(this.orden, this.key)
      .subscribe(() => {
        this.actualizaOrdenes.emit('actualiza');
      });
    }

  }

  onDelete() {
    this.ordenService.deleteOrdenPago(this.orden, this.key)
    .subscribe(() => {
      this.actualizaOrdenes.emit('actualiza');
    });
  }

  ngOnInit() {
  }

}
