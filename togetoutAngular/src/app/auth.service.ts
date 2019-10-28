import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Participant} from "./model/participant";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = false;

  reponse;
  reponseDecodee;

  reponseErreur;
  reponseSucces;

  header;

  utilisateurCourant;

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

  public getDecodeAccessToken(token:string) : any{
    try{
      return jwt_decode(token);
    }catch (Error) {
      return null;
    }
  }


  public register(participant: Participant){
    return new Promise((resolve, reject) => {



      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://10.12.200.7/togetout/public/api/register', participant, this.header).pipe(
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

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://10.12.200.7/togetout/public/api/login_check', participant, this.header).pipe(
        catchError(this.handleError('login', participant))
      ).subscribe((data)=>{

        console.log(data);
        this.reponse = data;
        console.log(this.reponse['token']);

        if (this.reponse['token'] != null) {
          this.reponseDecodee = this.getDecodeAccessToken(this.reponse['token']);

          this.reponseSucces = "Bonjour " + this.reponseDecodee.username + "! Vous êtes maintenant connecté";
          resolve(this.reponse);
        } else {
          this.reponseErreur = "Zut! Quelque chose d'inapproprié est survenu. Recommencez!"
          reject(this.reponse);
        }
      });
    })
  }

  public getUserInfo(token:string){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.reponse['token']
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://10.12.200.7/togetout/public/api/getuserinfo', token, this.header).pipe(
        catchError(this.handleError('getUserInfo', token))
      ).subscribe((data)=>{

        this.utilisateurCourant = data;

        if (this.utilisateurCourant != null) {
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
