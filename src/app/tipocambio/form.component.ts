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

  actualizar(): void{
    console.info("FormComponent actualizar");
    console.info("FormComponent actualizar id"+this.tipocambio.id);
    console.info("FormComponent actualizar data"+JSON.stringify(this.tipocambio));
    /*this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.tipocambioService.getTipoCambioById(id).subscribe( (tipocambio) => this.tipocambio = tipocambio)
      }
    })*/

    //llamar a la peticion que devuelve el ajax
    this.tipocambioService.actualizarTipoCambio(this.tipocambio).subscribe(
      tipocambio => {
        this.tipocambio = tipocambio;
        console.info("TipocambioComponent actualizar respuesta");
        console.info("TipocambioComponent actualizar respuesta"+JSON.stringify(this.tipocambio));
        console.info(JSON.stringify(this.tipocambio));
        this.router.navigate(['/tipocambio'])
      }
    );
  }

  
}
