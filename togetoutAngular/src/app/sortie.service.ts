import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Participant} from "./model/participant";
import {catchError} from "rxjs/operators";
import {Sortie} from "./model/sortie";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SortieService {
  private API_KEY = '85ea3c4488f34792a52161e3bb056a5a';
  private header;
  authenticated = false;
  reponse;
  reponseErreur;
  reponseSucces;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin' : '*'
      });
  }

  getAuthenticated(): boolean {
    return this.authenticated;
  }

  setAuthenticated(value: boolean) {
    this.authenticated = value;
  }
  getReponse() {
    return this.reponse;
  }

  setReponse(value) {
    this.reponse = value;
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


  public editSortie(newSortie: Sortie){
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://10.12.200.7/togetout/public/api/test/responseJSON', newSortie, httpOptions).pipe(
        catchError(this.handleError('editSortie', newSortie))
      ).subscribe((data)=>{
        console.log(data);
        this.reponse = data['statut'];
        console.log('reponse dans editSortie lui même');
        console.log(this.reponse);
      });

      if (this.reponse == 'ok') {
        resolve(this.reponse);
      } else {
        reject(this.reponse);
      }
    })
  }

  public annuleeSortie(sortieAnnulee: Sortie){
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://10.12.200.7/togetout/public/api/test/responseJSON', sortieAnnulee, httpOptions).pipe(
        catchError(this.handleError('editSortie', sortieAnnulee))
      ).subscribe((data)=>{
        console.log(data);
        this.reponse = data['statut'];
        console.log('reponse dans annulerSortie lui même');
        console.log(this.reponse);
      });

      if (this.reponse == 'ok') {
        resolve(this.reponse);
      } else {
        reject(this.reponse);
      }
    })
  }


}
