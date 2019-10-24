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
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import {AuthService} from "./auth.service";
import {SortieService} from "./sortie.service";
import {AuthGuard} from "./auth.guard";
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import * as $ from "jquery";
import { MainComponent } from './main/main.component';

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
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, SortieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
