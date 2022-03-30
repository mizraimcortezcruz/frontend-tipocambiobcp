import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Tipocambio } from './tipocambio';
import { Token } from "./token";
import { map } from 'rxjs/operators';
//import { Observable } from 'rxjs/Observable';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { of } from 'rxjs/observable/of';

/*@Injectable({
  providedIn: 'root'
})*/
@Injectable()
export class TipocambioService {
  private urlEndPoint: string = 'http://localhost:6004/tipocambio/getAll';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlEndPointGetAllTipoCambio: string = `http://localhost:6004/tipocambio/getAll`;
  private urlEndPointGetByIdTipoCambio: string = 'http://localhost:6004/tipocambio/getById';
  private urlEndPointGetToken: string = 'http://localhost:6004/login';

  constructor(private http: HttpClient) { }

  getToken(usuario:any,clave:any): Observable<Token> {
    console.info("TipocambioService getAllToken");
    console.info("TipocambioService getAllToken usuario"+usuario);
    console.info("TipocambioService getAllToken clave"+clave);
    return this.http.post<Token>(this.urlEndPointGetToken, { username: usuario,password: clave }, {headers: this.httpHeaders}).pipe(catchError(this.erroHandler));
    
  }

  erroHandler(error: HttpErrorResponse) {
    alert("No se encuentra registrado en el sistema.");
    return throwError(error.message || 'server Error');
  }

  getAllTipoCambio(token:any): Observable<Tipocambio[]> {
    console.info("TipocambioService getAllTipoCambio");
    console.info("TipocambioService getAllTipoCambio token es:"+token);
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.urlEndPointGetAllTipoCambio, { headers: reqHeader }).pipe(
      map((response:any) =>{
        //response as Tipocambio[]
        console.info("TipocambioService getAllTipoCambio response");
        return response as Tipocambio[];
      } )
    );
  }

  createTipoCambio(tipocambio: Tipocambio) : Observable<Tipocambio> {
    return this.http.post<Tipocambio>(this.urlEndPoint, tipocambio, {headers: this.httpHeaders})
  }

  getTipoCambioById(id:any): Observable<Tipocambio>{
    console.info("TipocambioService getTipoCambioById:"+id);
    
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('tokenbcp')}`
    });

    return this.http.get<Tipocambio>(`${this.urlEndPointGetByIdTipoCambio}/${id}`,{ headers: reqHeader })
  }

  updateTipoCambio(tipocambio: Tipocambio): Observable<Tipocambio>{
    return this.http.put<Tipocambio>('${this.urlEndPoint}/${tipocambio.id}', tipocambio, {headers: this.httpHeaders})
  }

  deleteTipoCambio(id: number): Observable<Tipocambio>{
    return this.http.delete<Tipocambio>('${this.urlEndPoint}/${id}', {headers: this.httpHeaders})
  }

}
