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
import {AuthGuardService} from "./auth-guard.service";
//import {AfficherSortieComponent} from "./afficher-sortie/afficher-sortie.component";


const routes: Routes = [
  {path: '', canActivate: [AuthGuardService], component: AccueilComponent},
  {path: 'inscription', component: InscriptionFormComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'creer', canActivate: [AuthGuardService], component: SortieFormComponent},
  {path: 'viewprofile', canActivate: [AuthGuardService], component: ViewProfileComponent},
  {path: 'search', canActivate: [AuthGuardService], component : SearchComponent},
  {path: 'editprofile', canActivate: [AuthGuardService], component : EditProfileComponent},
  {path: 'editsortie', canActivate: [AuthGuardService], component : EditSortieComponent},
  {path: 'anuleesortie', canActivate: [AuthGuardService], component : AnnulerSortieComponent},
  //{path: 'affichersortie', component : AfficherSortieComponent},
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
