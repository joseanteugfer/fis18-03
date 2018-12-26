import { Component, OnInit } from '@angular/core';
import { OrdenPago } from '../orden';
import { OrdenPagoService } from '../orden.service';

@Component({
  selector: 'app-ordenesPago',
  templateUrl: './ordenesPago.component.html',
  styleUrls: ['./ordenesPago.component.css']
})
export class OrdenesPagoComponent implements OnInit {

  ordenesPago: OrdenPago[];
  selectedOrdenPago: OrdenPago;
  newOrdenPago: OrdenPago = {
    name: null,
    phone: null
  };

  constructor(private ordenService: OrdenPagoService) { }

  addOrdenPago() {
    this.ordenesPago.push(this.newOrdenPago);
    this.newOrdenPago = {
      name: null,
      phone: null
    }
  }

  getOrdenesPago() {
    this.ordenService.getOrdenesPago()
      .subscribe((ordenesPago) => {
        this.ordenesPago = ordenesPago;
      });
  }

  ngOnInit() {
    this.getOrdenesPago();
  }

}
