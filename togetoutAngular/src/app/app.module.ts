import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root/app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccueilComponent } from './accueil/accueil.component';
import { InscriptionFormComponent } from './inscription-form/inscription-form.component';
import { LoginFormComponent} from "./login-form/login-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SortieFormComponent} from "./sortie-form/sortie-form.component";
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthService} from "./auth.service";
import { SortieService} from "./sortie.service";
import { AuthGuard} from "./auth.guard";
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import * as $ from "jquery";
import { CardComponent } from './card/card.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { SearchComponent } from './search/search.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {VilleFormComponent} from "./ville-form/ville-form.component";
import {LieuFormComponent} from "./lieu-form/lieu-form.component";
import { EditSortieComponent } from './edit-sortie/edit-sortie.component';
import { AnnulerSortieComponent } from './annuler-sortie/annuler-sortie.component';
import { AfficherSortieComponent } from './afficher-sortie/afficher-sortie.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccueilComponent,
    InscriptionFormComponent,
    LoginFormComponent,
    FooterComponent,
    SidebarComponent,
    SortieFormComponent,
    CardComponent,
    ViewProfileComponent,
    SearchComponent,
    EditProfileComponent,
    VilleFormComponent,
    LieuFormComponent,
    EditSortieComponent,
    AnnulerSortieComponent,
    AfficherSortieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [VilleFormComponent,
  LieuFormComponent
  ],
  providers: [AuthService, SortieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
