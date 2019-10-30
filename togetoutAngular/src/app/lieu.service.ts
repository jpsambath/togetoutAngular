import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LieuService {

  header;
  resultat;
  lieux;
  lieuxSelectionne = [];

  constructor(private httpClient: HttpClient, private authService:AuthService) { }

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

  public getLieux(){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.authService.token
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://10.12.200.10/togetout/public/api/getLieux', "getLieux", { "headers" :this.header}).pipe(
        catchError(this.handleError('getVille', this.authService.token))
      ).subscribe((data)=>{

        this.resultat = data;
        this.lieux = this.resultat['lieux'];

        if (this.resultat['statut'] == "ok") {
          resolve("On a les infos lieux");
        } else {
          reject("On a pas les infos lieux");
        }
      });
    })

  }
}
