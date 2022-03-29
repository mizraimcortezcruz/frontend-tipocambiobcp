import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tipocambio } from './tipocambio';
import { map } from 'rxjs/operators';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
//import { of } from 'rxjs/observable/of';

/*@Injectable({
  providedIn: 'root'
})*/
@Injectable()
export class TipocambioService {
  private urlEndPoint: string = 'http://localhost:6004/tipocambio/getAll';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getAllTipoCambio(): Observable<Tipocambio[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response:any) => response as Tipocambio[])
    );
  }

  createTipoCambio(tipocambio: Tipocambio) : Observable<Tipocambio> {
    return this.http.post<Tipocambio>(this.urlEndPoint, tipocambio, {headers: this.httpHeaders})
  }

  getTipoCambioById(id:any): Observable<Tipocambio>{
    return this.http.get<Tipocambio>('${this.urlEndPoint}/${id}')
  }

  updateTipoCambio(tipocambio: Tipocambio): Observable<Tipocambio>{
    return this.http.put<Tipocambio>('${this.urlEndPoint}/${tipocambio.id}', tipocambio, {headers: this.httpHeaders})
  }

  deleteTipoCambio(id: number): Observable<Tipocambio>{
    return this.http.delete<Tipocambio>('${this.urlEndPoint}/${id}', {headers: this.httpHeaders})
  }

}
