import {Component, Input, OnInit} from '@angular/core';
import { SortieService} from "../sortie.service";
import { AuthService} from "../auth.service";
import {Participant} from "../model/participant";
import {Router} from "@angular/router";
import {Sortie} from "../model/sortie";
import {MessageService} from "../message.service";


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  private reponses;
  listeSortiesInscrits: Sortie[] ;
  listeSortiesOrganisateurs: Sortie[] ;
  listeSortiesSemaineActuelle: Sortie[] ;
  listeSortiesSemaineProchaine: Sortie[] ;

  constructor(private messageService:MessageService, private sortieService : SortieService, private authService : AuthService, private router : Router) { }

  ngOnInit() {
    console.log("1. Initialisation Accueil");



    this.sortieService.getSortieInfo().then(
      () => {
        console.log("Récupération Sorties Réussie");


        this.listeSortiesInscrits = this.sortieService.sortiesInscrits ;
        this.listeSortiesOrganisateurs = this.sortieService.sortiesOrganisateurs ;
        this.listeSortiesSemaineActuelle = this.sortieService.sortiesSemaineActuelle ;
        this.listeSortiesSemaineProchaine = this.sortieService.sortiesSemaineProchaine ;

        console.log(this.listeSortiesInscrits);
        console.log(this.listeSortiesOrganisateurs);
        console.log(this.sortieService.sortiesSemaineActuelle);
        console.log(this.listeSortiesSemaineProchaine);

      }
      ,
      () => {
        console.log("Récupération Sorties Ratée");
      });


  }

  clearMessageSucces(){
    this.messageService.messageSucces = '' ;
  }

  clearMessageErreur(){
    this.messageService.messageErreur = '' ;
  }

}

