import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageSucces;
  messageErreur;

  constructor() { }
}
