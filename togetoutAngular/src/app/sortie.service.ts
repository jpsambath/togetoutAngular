import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Participant} from "./model/participant";
import {catchError} from "rxjs/operators";
import { AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {Sortie} from "./model/sortie";
import {MessageService} from "./message.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SortieService {
  private API_KEY = '85ea3c4488f34792a52161e3bb056a5a';
  header;

  sortiesInscrits;
  sortiesOrganisateurs;
  sortiesSemaineActuelle;
  sortiesSemaineProchaine;

  resultat;

  sortieAffichee: Sortie ;

  constructor(private messageService:MessageService, private httpClient: HttpClient, private authService:AuthService, private router:Router) {
    this.header = new HttpHeaders({
        'Content-Type':  'application/json'
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

  public participerSortie(id:number){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.authService.token
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://localhost/togetout/public/api/inscriptionSortie/'+id, "ParticiperSortie", { "headers" :this.header}).pipe(
        catchError(this.handleError('ParticiperSortie', this.authService.token))
      ).subscribe((data)=>{

        console.log(data['statut']);

        if (data['statut'] == "ok") {
          this.messageService.messageSucces = "Vous êtes inscrit à cette sortie!";
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/']);
        } else {
          this.messageService.messageErreur = "Vous n'êtes pas inscrit à cette sortie! Contactez un administrateur";
          reject("Inscription Sortie Ratée");
        }
      });
    })
  }

  public desinscrireSortie(id:number){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.authService.token
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://localhost/togetout/public/api/desistementSortie/'+id, "DesistementSortie", { "headers" :this.header}).pipe(
        catchError(this.handleError('DesistementSortie', this.authService.token))
      ).subscribe((data)=>{

        console.log(data['statut']);

        if (data['statut'] == "ok") {
          this.messageService.messageSucces = "Vous êtes désinscrit de cette sortie!";
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/']);
        } else {
          this.messageService.messageErreur = "Vous n'êtes pas désinscrit de cette sortie! Il va falloir y aller...";
          reject("Inscription Sortie Ratée");
        }
      });
    })
  }


  public getSortieInfo(){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.authService.token
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://localhost/togetout/public/api/getSortieInfo', "getSortieInfo", { "headers" :this.header}).pipe(
        catchError(this.handleError('getUserInfo', this.authService.token))
      ).subscribe((data)=>{

        this.sortiesInscrits = data['sortiesInscrits'];
        this.sortiesOrganisateurs = data['sortiesOrganisateurs'];
        this.sortiesSemaineActuelle = data['sortiesSemaineActuel'];
        this.sortiesSemaineProchaine = data['sortiesSemaineProchaine'];
        console.log(data['statut']);

        if (data['statut'] == "ok") {
          resolve("On a les infos sorties");
        } else {
          reject("On a pas les infos sorties");
        }
      });
    })
  }

  public setSortieAffichee(sortie: Sortie) {
    this.sortieAffichee = sortie ;
  }

  public getSortieAffichee() {
    return this.sortieAffichee ;
  }

  public creerSortie(sortie: Sortie){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.authService.token
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://localhost/togetout/public/api/creerSortie', sortie, { "headers" :this.header}).pipe(
        catchError(this.handleError('creerSortie', sortie))
      ).subscribe((data)=>{

        this.resultat = data;

        if (this.resultat['statut'] == 'ok') {
          this.messageService.messageSucces = "Sortie créée avec succès";
          resolve("creerSortie ok");
        } else {
          this.messageService.messageErreur = "Sortie non créée";
          reject("creerSortie ko");
        }
      });
    })
  }

}
