import { Component, OnInit } from '@angular/core';
import {MessageService} from "../message.service";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(private messageService:MessageService) { }

  ngOnInit() {
  }

  clearMessageSucces(){
    this.messageService.messageSucces = '' ;
  }

  clearMessageErreur(){
    this.messageService.messageErreur = '' ;
  }

}
