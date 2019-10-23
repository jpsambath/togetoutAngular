import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Participant} from "./participant";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _reponse;

  constructor(private httpClient: HttpClient) { }

  getReponse() {
    return this._reponse;
  }

  setReponse(value) {
    this._reponse = value;
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.httpClient.post('http://10.12.200.7/togetout/public/api/register', participant, httpOptions).pipe(
      catchError(this.handleError('register', participant))
    ).subscribe((data)=>{

      this._reponse = data['participants'];
      console.log("ici authservice");
      console.log(this._reponse);
    });

    /* http://togetout.local/register/ + JSON.stringify(participant);*/
  }
}
