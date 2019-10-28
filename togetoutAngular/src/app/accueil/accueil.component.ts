import { Component, OnInit } from '@angular/core';
import { SortieService} from "../sortie.service";
import { AuthService} from "../auth.service";
import {Participant} from "../model/participant";
import {Router} from "@angular/router";


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  private articles;
  private reponses;

  constructor(private sortieService : SortieService, private authService : AuthService, private router : Router) { }

  ngOnInit() {
    console.log("1. Initialisation Accueil");

    this.sortieService.getSortieInfo().then(
      () => {
        console.log("Récupération Sorties Réussie");
      }
      ,
      () => {
        console.log("Récupération Sorties Ratée");
      });


  }

}
