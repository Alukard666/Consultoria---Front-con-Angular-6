// Angular
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// Locals
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesDetailComponent } from './clientes/clientes-detail.component';
import { SuministrosComponent } from './suministros/suministros.component';
import { LoginComponent } from './login/login.component';


export const PAGINAS = [
  { name: 'Clientes', routerLink: 'clientes' },
  { name: 'Suministros', routerLink: 'suministros'},
];

const APP_ROUTES: Routes = [
  {path: '', component: ClientesComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/:id', component: ClientesDetailComponent},
  {path: 'suministros', component: SuministrosComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { useHash: false }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {}
export const routedComponents: any[] = [
  ClientesComponent,
];
