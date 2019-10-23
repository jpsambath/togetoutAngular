import { Component, OnInit } from '@angular/core';
import { SortieService} from "../sortie.service";
import { AuthService} from "../auth.service";

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
    console.log("ici accueil");
    console.log(this.authService.getReponse());
    console.log(this.reponses);
  }

}
