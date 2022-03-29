import { Component, OnInit } from '@angular/core';
import {Tipocambio} from './tipocambio'
import { TipocambioService } from "./tipocambio.service";
import {Router, ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public tipocambio: Tipocambio = new Tipocambio()
  public titulo:string = "Editar Tipo Cambio"

  constructor(private tipocambioService: TipocambioService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarTipoCambio()
  }

  cargarTipoCambio(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.tipocambioService.getTipoCambioById(id).subscribe( (tipocambio) => this.tipocambio = tipocambio)
      }
    })
  }

}
