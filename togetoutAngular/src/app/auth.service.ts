import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Participant} from "./model/participant";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = true;
  reponse;

  constructor(private httpClient: HttpClient) { }

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

  public register(participant: Participant){
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://10.12.200.7/togetout/public/api/register', participant, httpOptions).pipe(
        catchError(this.handleError('register', participant))
      ).subscribe((data)=>{

        console.log(data);
        this.reponse = data;

        console.log(this.reponse['statut']);

        if (this.reponse['statut'] == 'ok') {
          resolve(this.reponse);
        } else {
          reject(this.reponse);
        }
      });
    })
  }


  public login(participant: Participant){
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://10.12.200.7/togetout/public/api/login_check', participant, httpOptions).pipe(
        catchError(this.handleError('login', participant))
      ).subscribe((data)=>{

        console.log(data);
        this.reponse = data;

        console.log(this.reponse['token']);

        if (this.reponse['token'] != null) {
          resolve(this.reponse);
        } else {
          reject(this.reponse);
        }
      });
    })
  }


  public editProfile(participant: Participant){

  }


}
