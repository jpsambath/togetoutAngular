import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../message.service";
import {AuthService} from "../auth.service";
import {VilleService} from "../ville.service";
import {Router} from "@angular/router";
import {Participant} from "../model/participant";
import {SortieService} from "../sortie.service";
import {Sortie} from "../model/sortie";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm : FormGroup;
  allSortie:Sortie[];
  searchSortie:Sortie[];

  constructor(private messageService:MessageService, private authService:AuthService, private sortieService:SortieService, private villeService:VilleService, private router:Router, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({

    });

  }

  ngOnInit() {
    this.villeService.getVilles().then();

    this.searchForm = this.formBuilder.group({
      ville : '',
      recherche : '',
      dateDebut : '',
      heureDebut: '',
      dateFin : '',
      heureFin : '',
      cbxOrganisateur: false,
      cbxInscrit: false,
      cbxNonInscrit: false,
      cbxPassees:false
    });

    this.sortieService.getAllSortie().then(
      () => {
        console.log("Recherche All Sortie Réussie");
        this.allSortie= this.sortieService.allSortie;
      }
      ,
      () => {
        console.log("Recherche All Sortie Ratée");
      });

  }


  onSubmitForm(){
    const formValue = this.searchForm.value;

    console.log(formValue);

    this.sortieService.search(formValue).then(
      () => {
        console.log("Recherche Réussie");
        this.searchSortie= this.sortieService.searchSortie;
      }
      ,
      () => {
        console.log("Recherche Ratée");
      });
  }

  afficherSortie(sortie:Sortie){
    this.sortieService.setSortieAffichee(sortie) ;
    this.router.navigate(["/detailSortie"]) ;
  }

  clearMessageSucces(){
    this.messageService.messageSucces = '' ;
  }

  clearMessageErreur(){
    this.messageService.messageErreur = '' ;
  }

}
