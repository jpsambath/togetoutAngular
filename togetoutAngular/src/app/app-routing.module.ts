import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {InscriptionFormComponent} from "./inscription-form/inscription-form.component";
import {LoginFormComponent} from "./login-form/login-form.component";


const routes: Routes = [
  {path: '', component: InscriptionFormComponent},
  {path: 'inscription', component: InscriptionFormComponent},
  {path: 'login', component: LoginFormComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
