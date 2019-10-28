import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
    /*this.authService.getUserInfo(this.authService.reponse["token"]).then(
    () => {
      console.log("Récupération Utilisateur Réussi");
    }
  ,
    () => {
      console.log("Récupération Utilisateur Raté");
    });*/



    console.log("1. Initialisation SideBar");
  }

}
