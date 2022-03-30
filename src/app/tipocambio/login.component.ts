import { Component, OnInit } from '@angular/core';
import {Token} from './token'
import {User} from './user'

import { TipocambioService } from "./tipocambio.service";
import {Router, ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  
  public user: User = new User();
  public token: Token;

  constructor(private tipocambioService: TipocambioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login(): void {
    console.info("login");
    console.info("login username:"+this.user.username);
    console.info("login password:"+this.user.password);
    
    //llamar a la peticion que devuelve el ajax
    this.tipocambioService.getToken(this.user.username,this.user.password).subscribe(
      token => {
        this.token = token;
        console.info("TipocambioComponent getAllToken respuesta");
        console.info("TipocambioComponent getAllToken respuesta"+JSON.stringify(this.token));
        console.info(JSON.stringify(this.token));
        console.info("TipocambioComponent getAllToken respuesta token:"+this.token.token);
        //grabar en el sessionstorage el token
        sessionStorage.setItem('name', 'Mizraim Cortez Cruz');
        sessionStorage.setItem('tokenbcp', this.token.token);
        this.router.navigate(['/tipocambio'])
      }
    );
  }

}
