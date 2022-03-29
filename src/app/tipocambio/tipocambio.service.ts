import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tipocambio } from './tipocambio';
import { Token } from "./token";
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
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlEndPointGetAllTipoCambio: string = 'http://localhost:6004/tipocambio/getAll';
  private urlEndPointGetToken: string = 'http://localhost:6004/login';

  constructor(private http: HttpClient) { }

  getToken(usuario:any,clave:any): Observable<Token> {
    console.info("getAllToken");
    console.info("getAllToken usuario"+usuario);
    console.info("getAllToken clave"+clave);
    return this.http.post<Token>(this.urlEndPointGetToken, { username: usuario,password: clave }, {headers: this.httpHeaders});
    
  }

  getAllTipoCambio(token:any): Observable<Tipocambio[]> {
    console.info("getAllTipoCambio");
    console.info("getAllTipoCambio token es:"+token);
    return this.http.get(this.urlEndPointGetAllTipoCambio).pipe(
      map((response:any) =>{
        //response as Tipocambio[]
        console.info("getAllTipoCambio response");
        return response as Tipocambio[];
      } )
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
