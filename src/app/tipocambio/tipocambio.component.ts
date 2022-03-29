import { Component, OnInit } from '@angular/core';
import { Tipocambio } from "./tipocambio";
import { TipocambioService } from "./tipocambio.service";

@Component({
  selector: 'app-tipocambio',
  templateUrl: './tipocambio.component.html'
})
export class TipocambioComponent implements OnInit {
  
  tipocambio: Tipocambio[];

  constructor(private tipocambioService: TipocambioService) { }
  ngOnInit() {
    this.tipocambioService.getAllTipoCambio().subscribe(
      tipocambio => this.tipocambio = tipocambio
    );
  }
}
