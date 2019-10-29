import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Participant} from "./model/participant";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import * as jwt_decode from "jwt-decode";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = false;

  reponse;
  reponseDecodee;

  reponseErreur;
  reponseSucces;

  header = new HttpHeaders({
    'Content-Type':  'application/json'
  });

  utilisateurCourant;

  constructor(private httpClient: HttpClient, private router: Router) {

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
      this.httpClient.post('http://localhost/togetout/public/api/register', participant, { "headers" :this.header}).pipe(
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
      this.httpClient.post('http://localhost/togetout/public/api/login_check', participant, { "headers" :this.header}).pipe(
        catchError(this.handleError('login', participant))
      ).subscribe((data)=>{

        console.log(data);
        this.reponse = data;
        console.log(this.reponse['token']);

        if (this.reponse['token'] != null) {
          this.reponseDecodee = this.getDecodeAccessToken(this.reponse['token']);

          localStorage.setItem("token", this.reponse['token']);

          this.reponseSucces = "Bonjour " + this.reponseDecodee.username + "! Vous êtes maintenant connecté";
          resolve(this.reponse);
        } else {
          this.reponseErreur = "Zut! Quelque chose d'inapproprié est survenu. Recommencez!"
          reject(this.reponse);
        }
      });
    })
  }

  public logout(participant: Participant){
    this.authenticated = false;
    this.reponse['token'] = "";
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    this.reponseSucces = "Vous avez été déconnecté! A bientôt!";
    this.router.navigate(["/login"]);
  }



  public getUserInfo(){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        //'Access-Control-Allow-Origin' : '*',
        'Authorization': 'Bearer ' + this.reponse['token']
      });

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://localhost/togetout/public/api/getUserInfo', "", { "headers" :this.header}).pipe(
        catchError(this.handleError('getUserInfo', this.reponse['token']))
      ).subscribe((data)=>{

        this.utilisateurCourant = data['participant']['0'];

        console.log(this.utilisateurCourant);

        if (this.utilisateurCourant != null) {
          resolve(this.reponse);
        } else {
          reject(this.reponse);
        }
      });
    })
  }

  public editProfile(participant: Participant){
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post('http://10.12.200.7/togetout/public/api/test/responseJSON', participant, httpOptions).pipe(
        catchError(this.handleError('editProfile', participant))
      ).subscribe((data)=>{
        console.log(data);
        this.reponse = data['statut'];
        console.log('reponse dans register lui même');
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
