import { Component, OnInit } from '@angular/core';
import { Tipocambio } from "./tipocambio";
import { TipocambioService } from "./tipocambio.service";
import { Token } from "./token";

@Component({
  selector: 'app-tipocambio',
  templateUrl: './tipocambio.component.html'
})
export class TipocambioComponent implements OnInit {
  
  tipocambio: Tipocambio[];
  token: Token;

  constructor(private tipocambioService: TipocambioService) { }
  ngOnInit() {
    console.info("constructor.....");
    
    this.tipocambioService.getAllTipoCambio(sessionStorage.getItem('tokenbcp')).subscribe(
      tipocambio => this.tipocambio = tipocambio
    );

    this.tipocambioService.getToken('admin','admin').subscribe(
      token => {
        this.token = token;
        console.info("TipocambioComponent getAllToken respuesta");
        console.info("TipocambioComponent getAllToken respuesta"+JSON.stringify(this.token));
        console.info(JSON.stringify(this.token));
        console.info("TipocambioComponent getAllToken respuesta token:"+this.token.token);
        
        

      }
    );
  }
}
