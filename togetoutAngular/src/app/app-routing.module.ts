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
import {DecoGuardService} from "./deco-guard.service";
import {AfficherSortieComponent} from "./afficher-sortie/afficher-sortie.component";
//import {AfficherSortieComponent} from "./afficher-sortie/afficher-sortie.component";


const routes: Routes = [
  {path: '', canActivate: [AuthGuardService], component: AccueilComponent},
  {path: 'inscription', canActivate: [DecoGuardService], component: InscriptionFormComponent},
  {path: 'login', canActivate: [DecoGuardService], component: LoginFormComponent},
  {path: 'creer', canActivate: [AuthGuardService], component: SortieFormComponent},
  {path: 'viewProfile', canActivate: [AuthGuardService], component: ViewProfileComponent},
  {path: 'search', canActivate: [AuthGuardService], component : SearchComponent},
  {path: 'editProfile', canActivate: [AuthGuardService], component : EditProfileComponent},
  {path: 'editSortie', canActivate: [AuthGuardService], component : EditSortieComponent},
  {path: 'annulerSortie', canActivate: [AuthGuardService], component : AnnulerSortieComponent},
  {path: 'detailSortie', canActivate: [AuthGuardService], component : AfficherSortieComponent},
  {path: '**', canActivate: [AuthGuardService], redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
