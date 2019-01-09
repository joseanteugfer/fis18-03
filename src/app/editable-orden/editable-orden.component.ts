import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrdenPago } from '../orden';
import { Invoice } from '../invoice';
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
  invoiceAmount: Number;
  cantidad: Number;
  invoice: Invoice;

  constructor(private ordenService: OrdenPagoService) { }

  //editamos una orden de pago y avisamos al componente padre para que actualice el front-end haciendo una llamada a getOrdenesPago
  onEdit() {
    this.editable = !this.editable;
    if (this.editable === false) {
      this.ordenService.editOrdenPago(this.orden, this.key)
      .subscribe(() => {
        this.actualizaOrdenes.emit('actualiza');
      });
    }

  }

  //eliminamos una orden de pago y avisamos al componente padre para que actualice el front-end haciendo una llamada a getOrdenesPago
  onDelete() {
    this.ordenService.deleteOrdenPago(this.orden, this.key)
    .subscribe(() => {
      this.actualizaOrdenes.emit('actualiza');
    });
  }

onChange() {

    // tslint:disable-next-line:max-line-length
    this.ordenService.getInvoice(this.orden.idfactura).subscribe(
      (data) => { // Success
        this.invoice = data;
        this.invoiceAmount = this.invoice.amount;
        console.log('cantidad Invoice ' + this.invoice.amount);
        console.log('cantidad orden de pago ' + this.orden.cantidad);
        console.log(this.invoice);
       
      },
      (error) => {
        console.error(error);
      }
    );
    this.cantidad = this.orden.cantidad;
    if (this.cantidad > this.invoiceAmount || this.orden.iban.length !== 20 || this.orden.cantidad < 0 ) {
      console.log('he entrado en rechazado');
      this.orden.estado = 'RECHAZADO';
    } else {
      this.orden.estado = 'EJECUTADA';
    }
    this.ordenService.changeStatusOrdenPago(this.orden, this.key)
    .subscribe(() => {
      this.actualizaOrdenes.emit('actualiza');
    });
  }


  ngOnInit() {
  }

}
