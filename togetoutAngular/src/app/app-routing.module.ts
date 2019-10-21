import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {InscriptionFormComponent} from "./inscription-form/inscription-form.component";

const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'inscription', component: InscriptionFormComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
