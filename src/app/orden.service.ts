import { Injectable } from '@angular/core';
import { OrdenPago } from './orden';
import { ORDENES } from './mock-ordenesPago';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenPagoService {

  serverUrl = "/api/v1";

  constructor(private httpClient: HttpClient) { }

  getOrdenesPago(): Observable<OrdenPago[]> {
    const url = this.serverUrl + "/ordenesPago";
    return this.httpClient.get<OrdenPago[]>(url);    
  }
}
