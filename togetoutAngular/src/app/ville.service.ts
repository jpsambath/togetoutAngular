import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import { AuthService} from "./auth.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  header;
  villes;
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

  public getVilles(){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.authService.reponse['token']
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://localhost/togetout/public/api/getVilles', "getVilles", { "headers" :this.header}).pipe(
        catchError(this.handleError('getVille', this.authService.reponse['token']))
      ).subscribe((data)=>{

        this.villes = data['villes'];

        if (data['statut'] == "ok") {
          resolve("On a les infos villes");
        } else {
          reject("On a pas les infos villes");
        }
      });
    })

  }

}
