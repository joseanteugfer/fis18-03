import { Component, OnInit, Input } from '@angular/core';
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
  @Input('ordenesPago') ordenesPago: OrdenPago[];

 



  editable = false;


  constructor(private ordenService: OrdenPagoService) { }


  onEdit() {
    this.editable = ! this.editable;
    if (this.editable === true) {
      this.ordenService.editOrdenPago(this.orden);
    }

  }

  onDelete() {
    this.ordenService.deleteOrdenPago(this.orden)
    .subscribe(() => {
      this.ordenService.getOrdenesPago(this.key)
        .subscribe((ordenesPago) => {
          this.ordenesPago = ordenesPago;
        });
    });;
  }

  ngOnInit() {
  }

}
