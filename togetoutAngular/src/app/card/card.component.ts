  import {Component, Input, OnInit} from '@angular/core';
  import {Sortie} from "../model/sortie";
  import {SortieService} from "../sortie.service";
  import {AuthService} from "../auth.service";
  import {Router} from "@angular/router";

  @Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() sortie: Sortie;
  inscrit:Boolean;
  organisateur:Boolean;
  constructor(private sortieService:SortieService, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.inscrit =false;
    for(let participant of this.sortie.participants){
      if(participant.id == this.authService.user.id){
        this.inscrit = true;
        break;
      }
    }

    this.organisateur=false;
      if(this.authService.user.id == this.sortie.organisateur.id){
        this.organisateur=true;
      }


  }

  editSortie(){
    this.sortieService.setSortieAffichee(this.sortie) ;
    this.router.navigate(["/editSortie"]) ;
  }

  detailSortie(){
    this.sortieService.setSortieAffichee(this.sortie) ;
    this.router.navigate(["/detailSortie"]) ;
  }

  participerSortie(){
    this.sortieService.participerSortie(this.sortie.id);
  }

  desinscrireSortie(){
    this.sortieService.desinscrireSortie(this.sortie.id);
  }

}
