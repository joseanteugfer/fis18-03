import { Injectable } from '@angular/core';
import { OrdenPago } from './orden';
import { ORDENES } from './mock-ordenesPago';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


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

  addOrdenPago(orden: OrdenPago): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.serverUrl}/ordenesPago/`;
    return this.httpClient.post(url, orden, {responseType: 'text', headers: headers})
      .pipe(
          tap(() => this.log(`add orden id =${orden.idfactura}`)),
          catchError(this.handleError('addOrdenPago', []))
      );
  }
}
