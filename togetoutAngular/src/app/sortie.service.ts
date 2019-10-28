import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Participant} from "./model/participant";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SortieService {
  private API_KEY = '85ea3c4488f34792a52161e3bb056a5a';
  private header;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin' : '*'
      });
  }


}
