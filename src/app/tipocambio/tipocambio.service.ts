import { Component,Injectable } from '@angular/core';
/*import {MatDialog} from '@angular/material/dialog';*/
/*import {MaterialModule} from '@angular/material';*/
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
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
  private urlEndPointSaveTipoCambio: string = `http://localhost:6004/tipocambio/guardar`;
  private urlEndPointUpdateTipoCambio: string = `http://localhost:6004/tipocambio/actualizar`;
  
  constructor(private http: HttpClient,private matDialog: MatDialog,public dialog: MatDialog) { }

  getToken(usuario:any,clave:any): Observable<Token> {
    console.info("TipocambioService getAllToken");
    console.info("TipocambioService getAllToken usuario"+usuario);
    console.info("TipocambioService getAllToken clave"+clave);
    return this.http.post<Token>(this.urlEndPointGetToken, { username: usuario,password: clave }, {headers: this.httpHeaders}).pipe(catchError(this.erroHandler));
    
  }

  erroHandler(error: HttpErrorResponse) {
    /*let dialogRef = dialog.open(YourDialog, {
      data: { name: 'austin' },
    });*/
    alert("No se encuentra registrado en el sistema.");
    /*this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda',
      },
    });*/
    return throwError(error.message || 'server Error');
  }

  openDialog() {
    //const dialogConfig = new MatDialogConfig();
    //this.matDialog.open(DialogBodyComponent, dialogConfig);
    
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
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('tokenbcp')}`
    });
    return this.http.post<Tipocambio>(this.urlEndPointSaveTipoCambio, tipocambio, {headers: reqHeader}).pipe(catchError(this.erroHandlerSave));
  }

  erroHandlerSave(error: HttpErrorResponse) {
    alert("Solo los usuarios con rol ADMIN puede registrar nuevos tipos de cambio.");
    return throwError(error.message || 'server Error');
  }

  actualizarTipoCambio(tipocambio: Tipocambio) : Observable<Tipocambio> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('tokenbcp')}`
    });
    return this.http.post<Tipocambio>(this.urlEndPointUpdateTipoCambio, tipocambio, {headers: reqHeader}).pipe(catchError(this.erroHandlerActualizar));
  }

  erroHandlerActualizar(error: HttpErrorResponse) {
    alert("Solo los usuarios con rol ADMIN pueden actualizar el tipo de cambio.");
    return throwError(error.message || 'server Error');
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

export class DialogContentExampleDialog {}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html'
})
export class DialogDataExampleDialog {
  //constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}