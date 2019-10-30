import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import { AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import * as MesConstantes from './model/global'
import {Sortie} from "./model/sortie";
import {Ville} from "./model/ville";

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  header;
  resultat;
  villes

  constructor(private messageService:MessageService, private httpClient: HttpClient, private authService:AuthService) { }

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

  public getVilles(){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.authService.token
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post(MesConstantes.api+'getVilles', "getVilles", { "headers" :this.header}).pipe(
        catchError(this.handleError('getVille', this.authService.token))
      ).subscribe((data)=>{

        this.resultat = data;
        this.villes = this.resultat['villes'];

        if (this.resultat['statut'] == "ok") {
          resolve("On a les infos villes");
        } else {
          reject("On a pas les infos villes");
        }
      });
    })

  }

  public creerVille(ville: Ville){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.authService.token
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post(MesConstantes.api+'ajoutVille', ville, { "headers" :this.header}).pipe(
        catchError(this.handleError('ajoutVille', ville))
      ).subscribe((data)=>{

        this.resultat = data;

        if (this.resultat['statut'] == 'ok') {
          this.messageService.messageSucces = "Ville créée avec succès";
          resolve("creerVille ok");
        } else {
          this.messageService.messageErreur = "Ville non créée";
          reject("creerVille ko");
        }
      });
    })
  }

}
