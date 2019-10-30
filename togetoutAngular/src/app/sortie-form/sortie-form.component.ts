import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Etat} from "../model/etat";
import {Sortie} from "../model/sortie";
import {VilleFormComponent} from "../ville-form/ville-form.component";
import {LieuFormComponent} from "../lieu-form/lieu-form.component";
import { VilleService} from "../ville.service";
import {LieuService} from "../lieu.service";
import {Lieu} from "../model/lieu";
import {SortieService} from "../sortie.service";
import {Site} from "../model/site";
import {Participant} from "../model/participant";
import {Ville} from "../model/ville";
import {AuthService} from "../auth.service";
import {MessageService} from "../message.service";


@Component({
  selector: 'app-sortie-form',
  templateUrl: './sortie-form.component.html',
  styleUrls: ['./sortie-form.component.css']
})
export class SortieFormComponent implements OnInit {

  sortieForm : FormGroup;
  ville = VilleFormComponent ;
  lieu = LieuFormComponent ;
  dateDuJour = Date.now() ;
  user ;
  private villeAffichee = false ;
  private villeNonAffichee = !this.villeAffichee ;
  private lieuAffiche= false ;
  private lieuNonAffiche= !this.lieuAffiche ;

  constructor(private messageService:MessageService, private formBuilder: FormBuilder, private router : Router, public viewContainerRef: ViewContainerRef, private lieuService:LieuService, private villeService:VilleService, private sortieService:SortieService, private authService: AuthService) { }

  ngOnInit() {

    this.lieuService.getLieux().then();
    this.villeService.getVilles().then();
    this.user = this.authService.getUserInfo() ;

    this.sortieForm = this.formBuilder.group({
      nom : ['', Validators.required],
      date : ['', Validators.required],
      heure : '',
      dateLimite : '',
      heureLimite : 0,
      nbInscriptionMax : 0,
      duree : 0,
      infosSortie : '',
      site : new FormControl({value: '', disabled: true}),
      ville : '',
      lieu : '',
      rue : new FormControl({value: '', disabled: true}),
      codePostal : new FormControl({value: '', disabled: true}),
      latitude : new FormControl({value: '', disabled: true}),
      longitude : new FormControl({value: '', disabled: true})
    });

  }

  onSubmitForm(buttonID: string) {
    const formValue = this.sortieForm.value;
    let etat ;
    if(buttonID === 'enregistrer') {
      etat = new Etat('Créée', 1) ;
    }
    else {
      etat = new Etat('Ouverte', 2) ;
    }
    let dateSortie = new Date(formValue['date'] + ' ' + formValue['heure']) ;
    let dateLimite = new Date(formValue['dateLimite'] + ' ' + formValue['heureLimite']) ;

    let lieuChoisi:Lieu;

    for(let lieu of this.lieuService.lieuxSelectionne){
      if(lieu.id == formValue['lieu']){
        lieuChoisi = lieu;
      }
    }

    const nouvelleSortie = new Sortie(
      formValue['nom'],
      null,
      formValue['date'] + ' ' + formValue['heure'],
      formValue['duree'],
      formValue['dateLimite'] + ' ' + formValue['heureLimite'],
      formValue['nbInscriptionMax'],
      formValue['infosSortie'],
      lieuChoisi,
      etat,
      null
    );
    console.log("*---------------JSON POUR LOIC---------------------");
    console.log(JSON.stringify(nouvelleSortie));

    this.sortieService.creerSortie(nouvelleSortie).then(
      () => {
        console.log("Sortie Créée avec Succès");
      }
      ,
      () => {
        console.log("Sortie Ratée");
      });



    console.log('Nouvelle sortie créée par le formulaire : ')
    console.log(nouvelleSortie);
  }

  changeLieu(){
    let villeSelectionnee = (document.getElementById("ville")) as HTMLSelectElement;
    let idVilleSelectionne = (villeSelectionnee.options[villeSelectionnee.selectedIndex]).value;

    this.lieuService.lieuxSelectionne = [];

    this.lieuService.lieux.forEach((lieu) =>{
      if(lieu["ville"]["id"] == idVilleSelectionne)
        this.lieuService.lieuxSelectionne.push(lieu);
      })
    /*console.log("----------------- Lieu Selectionne -------------------");
    console.log(this.lieuService.lieuxSelectionne);*/
/*
    console.log("Quelle ville est sélectionnée?");
    console.log((villeSelectionnee.options[villeSelectionnee.selectedIndex]).value);
    console.log((villeSelectionnee.options[villeSelectionnee.selectedIndex]).textContent);
*/
  }

  villeFormAppend(divId : string) {
    this.villeAffichee = !this.villeAffichee ;
    this.villeNonAffichee = !this.villeNonAffichee ;
  }

  lieuFormAppend(buttonId : string) {
    this.lieuAffiche = !this.lieuAffiche ;
    this.lieuNonAffiche = !this.lieuNonAffiche ;
  }

}
