import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { TipocambioComponent } from './tipocambio/tipocambio.component';
import { TipocambioService } from "./tipocambio/tipocambio.service";
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './tipocambio/form.component';
import { LoginComponent } from './tipocambio/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/tipocambio/login', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'tipocambio', component: TipocambioComponent},
  {path: 'tipocambio/form', component: FormComponent},
  {path: 'tipocambio/form/:id', component: FormComponent},
  {path: 'tipocambio/login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    TipocambioComponent,
    FormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TipocambioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
