import { Injectable } from '@angular/core';
import { OrdenPago } from './orden';
import { ORDENES } from './mock-ordenesPago';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Http,Headers,RequestOptions,URLSearchParams } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class OrdenPagoService {

  serverUrl = '/api/v1';

  constructor(private httpClient: HttpClient) { }

   /** Log a HeroService message with the MessageService */
   private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
    console.log(`HeroService: ${message}`);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  getOrdenesPago(key: string): Observable<OrdenPago[]> {
    const url = `${this.serverUrl}/ordenesPago/?apikey=`+ key;
    return this.httpClient.get<OrdenPago[]>(url);
}

  getOrdenesPagoProyecto(): Observable<OrdenPago> {
    const url = `${this.serverUrl}/ordenesPago/idproyecto/:idproyecto`;
    return this.httpClient.get<OrdenPago>(url);
  }

  addOrdenPago(orden: OrdenPago, key: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${this.serverUrl}/ordenesPago/?apikey=`+ key;

    return this.httpClient.post(url, orden, {responseType: 'text', headers: headers})
      .pipe(
          tap(() => this.log(`add orden id =${orden.idfactura}`)),
          catchError(this.handleError('addOrdenPago', []))
      );
  }

  editOrdenPago(orden: OrdenPago, key: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let idproyecto = orden.idproyecto;
    const url = `${this.serverUrl}/ordenesPago/idproyecto/`+idproyecto+`?apikey=`+ key;
    return this.httpClient.put(url, orden, {responseType: 'text', headers: headers})
      .pipe(
          tap(() => this.log(`edit orden id =${orden.idproyecto}`)),
          catchError(this.handleError('editOrdenPago', []))
      );
  }


  changeStatusOrdenPago(orden: OrdenPago, key: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let idproyecto = orden.idproyecto;
    const url = `${this.serverUrl}/changeOrdenesPago/idproyecto/`+idproyecto+`?apikey=`+ key;
    return this.httpClient.put(url, orden, {responseType: 'text', headers: headers})
      .pipe(
          tap(() => this.log(`change status orden id =${orden.idproyecto}`)),
          catchError(this.handleError('changeOrdenPago', []))
      );
  }


  deleteOrdenPago(orden: OrdenPago, key: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let idfactura = orden.idfactura;
    const url = `${this.serverUrl}/ordenesPago/idfactura/`+idfactura+`?apikey=`+key;
    return this.httpClient.delete(url, {responseType: 'text', headers: headers})
    .pipe(
        tap(() => this.log(`delete orden id =${orden.idfactura}`)),
        catchError(this.handleError('deleteOrdenPago', []))
    );
  }

  getProjects() {
    return this.httpClient.get('http://fis2018-02.herokuapp.com/api/v1/proyects/?apikey=11165da8-c45d-4cb3-95c4-6fa13939f7a5');
  }

}
