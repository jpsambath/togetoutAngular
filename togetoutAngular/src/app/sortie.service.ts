import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Participant} from "./model/participant";
import {catchError} from "rxjs/operators";
import { AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {Sortie} from "./model/sortie";

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

  reponse;
  //reponseOk;
  //reponseErreur;


  constructor(private httpClient: HttpClient, private authService:AuthService) {
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

  public getSortieInfo(){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.authService.reponse['token']
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://localhost/togetout/public/api/getSortieInfo', "getSortieInfo", { "headers" :this.header}).pipe(
        catchError(this.handleError('getUserInfo', this.authService.reponse['token']))
      ).subscribe((data)=>{

        this.sortiesInscrits = data['sortiesInscrits'];
        this.sortiesOrganisateurs = data['sortiesOrganisateurs'];
        this.sortiesSemaineActuelle = data['sortiesSemaineActuel'];
        this.sortiesSemaineProchaine = data['sortiesSemaineProchaine'];

        if (data['statut'] == "ok") {
          resolve("On a les infos sorties");
        } else {
          reject("On a pas les infos sorties");
        }
      });
    })
  }

  public creerSortie(sortie: Sortie){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.authService.reponse['token']
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://localhost/togetout/public/api/creerSortie', sortie, { "headers" :this.header}).pipe(
        catchError(this.handleError('creerSortie', sortie))
      ).subscribe((data)=>{

        this.reponse = data;

        if (this.reponse['statut'] == 'ok') {
          //this.reponseOk = this.reponse['messageOk'];
          resolve(this.reponse);
        } else {
          //this.reponseErreur = this.reponse['messageErreur'];
          reject(this.reponse);
        }
      });
    })
  }

}
