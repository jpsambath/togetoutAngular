import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Participant} from "./model/participant";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import * as jwt_decode from "jwt-decode";
import {Router} from "@angular/router";
import {MessageService} from "./message.service";
import {Message} from "ng-chat";
import * as MesConstantes from './model/global'





@Injectable({
  providedIn: 'root'
})
export class AuthService {


  authenticated = true;
  token;
  user;

  resultat;
  profilAffiche: Participant;


  header = new HttpHeaders({
    'Content-Type':  'application/json'
  });



  constructor(private messageService:MessageService,private httpClient: HttpClient, private router: Router) {

  }


  getAuthenticated(): boolean {
    return this.authenticated;
  }

  setAuthenticated(value: boolean) {
    this.authenticated = value;
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

  getProfilAffiche(): Participant {
    return this.profilAffiche;
  }

  setProfilAffiche(value: Participant) {
    this.profilAffiche = value;
  }
  public register(participant: Participant){
    return new Promise((resolve, reject) => {
      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post(MesConstantes.api+'register', participant, { "headers" :this.header}).pipe(
        catchError(this.handleError('register', participant))
      ).subscribe((data)=>{

        this.resultat = data;

        if (this.resultat['statut'] == 'ok') {
          this.messageService.messageSucces = this.resultat['messageOk'];
          resolve("register ok");
        } else {
          this.messageService.messageErreur = this.resultat['messageErreur'];
          reject("register ko");
        }
      });
    })
  }

  public login(participant: Participant){
    return new Promise((resolve, reject) => {

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post(MesConstantes.api+'login_check', participant, { "headers" :this.header}).pipe(
        catchError(this.handleError('login', participant))
      ).subscribe((data)=>{

        this.resultat = data;
        this.token = this.resultat['token'];

        if (this.token != null) {

          localStorage.setItem("token", this.token);
          this.getUserInfo().then(()=>{
              this.messageService.messageSucces = "Bonjour " + this.user.username + "! Vous êtes maintenant connecté";

              resolve("login ok");
          },
            ()=>{
            this.messageService.messageErreur = "Zut! Quelque chose d'inapproprié est survenu. Recommencez!"
              reject("login ko");
            });


        } else {
          this.messageService.messageErreur = "Zut! Quelque chose d'inapproprié est survenu. Recommencez!"
          reject("login ko");
        }
      });
    })
  }

  public logout(){
    this.authenticated = false;
    this.token = "";
    localStorage.removeItem("token");
    this.messageService.messageSucces = "Vous avez été déconnecté! A bientôt!";
    this.router.navigate(["/login"]);
  }



  public getUserInfo(){
    return new Promise((resolve, reject) => {
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token
      });

      this.httpClient.post(MesConstantes.api+'getUserInfo', "", { "headers" :this.header}).pipe(
        catchError(this.handleError('getUserInfo', this.token))
      ).subscribe((data)=>{

        this.user = data['participant'][0];

        console.log(this.user);

        if (this.user != null) {
          resolve("getUserInfo ok");
        } else {
          reject("getUserInfo ko");
        }
      });
    }).then(()=>{
      return true;
    },()=>{
      return false;
    });
  }

  public editProfile(participant: Participant){
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.token
        })
      };

      /* Stocker Observable dans attribut du service pour écoute par d'autres composants */
      this.httpClient.post(MesConstantes.api+'modifierProfil', participant, httpOptions).pipe(
        catchError(this.handleError('editProfile', participant))
      ).subscribe((data)=>{
        console.log(data);
        this.resultat = data;

        if (this.resultat['statut'] == 'ok') {
          this.messageService.messageSucces = "Profil modifié avec succès";
          resolve("editProfile ok");
        } else {
          this.messageService.messageErreur = "Profil non modifié";
          reject("editProfile ko");
        }
      });
    })
  }
}
