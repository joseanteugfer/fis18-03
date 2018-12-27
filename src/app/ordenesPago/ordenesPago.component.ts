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
    idproyecto: null,
    idfactura: null,
    idcomservicios: null,
    concepto: null,
    cantidad: null,
    beneficiario: null,
    iban: null
  };

  constructor(private ordenService: OrdenPagoService) { }

  addOrdenPago() {
    this.ordenesPago.push(this.newOrdenPago);
    this.newOrdenPago = {
      idproyecto: null,
      idfactura: null,
      idcomservicios: null,
      concepto: null,
      cantidad: null,
      beneficiario: null,
      iban: null
    };
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
