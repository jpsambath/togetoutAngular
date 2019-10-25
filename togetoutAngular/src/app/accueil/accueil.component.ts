import { Component, OnInit } from '@angular/core';
import { SortieService} from "../sortie.service";
import { AuthService} from "../auth.service";
import {Participant} from "../model/participant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  private articles;
  private reponses;

  constructor(private sortieService : SortieService, private authService : AuthService, private router : Router) { }

  ngOnInit() {
    /*if(!this.authService.authenticated){
      this.router.navigate(['/login']);
    }*/


    this.reponses = this.authService.getReponse();
    console.log('statut dans accueil');
    console.log(this.reponses);

    /*this.authService.getReponse().subscribe((data)=>{
        this.reponses = data;
        console.log("ici accueil");
        console.log(this.reponses);
    });*/

  }

}
