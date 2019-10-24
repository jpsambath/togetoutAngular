import { Component, OnInit } from '@angular/core';
import { SortieService} from "../sortie.service";
import { AuthService} from "../auth.service";
import {Participant} from "../model/participant";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  private articles;
  private reponses;

  constructor(private sortieService : SortieService, private authService : AuthService) { }

  ngOnInit() {
    this.sortieService.getNews().subscribe((data)=>{
      this.articles = data['articles'];
    });

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
