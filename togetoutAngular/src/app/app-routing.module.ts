import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {InscriptionFormComponent} from "./inscription-form/inscription-form.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {SortieFormComponent} from "./sortie-form/sortie-form.component";
import {ViewProfileComponent} from "./view-profile/view-profile.component";
import { SearchComponent } from './search/search.component';
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {EditSortieComponent} from "./edit-sortie/edit-sortie.component";
import {AnnulerSortieComponent} from "./annuler-sortie/annuler-sortie.component";
//import {AfficherSortieComponent} from "./afficher-sortie/afficher-sortie.component";


const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'inscription', component: InscriptionFormComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'creer', component: SortieFormComponent},
  {path: 'viewprofile', component: ViewProfileComponent},
  {path: 'search', component : SearchComponent},
  {path: 'editprofile', component : EditProfileComponent},
  {path: 'editsortie', component : EditSortieComponent},
  {path: 'anuleesortie', component : AnnulerSortieComponent},
  //{path: 'affichersortie', component : AfficherSortieComponent},
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
