// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Material Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import 'hammerjs';
// Locals
import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app.routing';
import { SearchPipe } from './pipes/search';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesDetailComponent } from './clientes/clientes-detail.component';
import { ClienteService } from './services/cliente.service';
import { SuministrosComponent } from './suministros/suministros.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientesComponent,
    ClientesDetailComponent,
    SuministrosComponent,
    routedComponents,
    SearchPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ClienteService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
