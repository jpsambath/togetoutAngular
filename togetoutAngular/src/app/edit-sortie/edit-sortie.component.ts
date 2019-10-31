import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Etat} from "../model/etat";
import {Sortie} from "../model/sortie";
import {VilleFormComponent} from "../ville-form/ville-form.component";
import {LieuFormComponent} from "../lieu-form/lieu-form.component";
import { SortieService } from "../sortie.service";
import {MessageService} from "../message.service";
import {DatePipe} from '@angular/common';
import {VilleService} from "../ville.service";
import {LieuService} from "../lieu.service";
import {Lieu} from "../model/lieu";

@Component({
  selector: 'app-edit-sortie',
  templateUrl: './edit-sortie.component.html',
  styleUrls: ['./edit-sortie.component.css']
})
export class EditSortieComponent implements OnInit {
  SortieForm : FormGroup;
  ville = VilleFormComponent ;
  lieu = LieuFormComponent ;
  villes = this.villeService.villes ;
  lieux = this.lieuService.lieuxSelectionne ;
  private villeAffichee = false ;
  private villeNonAffichee = !this.villeAffichee ;
  private lieuAffiche= false ;
  private lieuNonAffiche= !this.lieuAffiche ;
  sortie: Sortie ;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private router: Router, public viewContainerRef: ViewContainerRef,private sortieService: SortieService, public datepipe: DatePipe, private villeService: VilleService, private lieuService: LieuService) { }

  ngOnInit() {
    this.lieuService.getLieux().then();
    this.villeService.getVilles().then();
    this.sortie = this.sortieService.getSortieAffichee() ;
    this.SortieForm = this.formBuilder.group({
      nom : [this.sortie.nom, Validators.required],
      date : [this.datepipe.transform(this.sortie.dateHeureDebut, 'dd/MM/yyyy - HH:mm'), Validators.required],
      dateLimite : this.datepipe.transform(this.sortie.dateLimiteInscription, 'dd/MM/yyyy - HH:mm'),
      nbInscriptionMax : this.sortie.nbInscriptionMax,
      duree : this.datepipe.transform(this.sortie.dateLimiteInscription, 'HH:mm'),
      infosSortie : this.sortie.infosSortie,
      site : this.sortie.site.nom,
      ville : this.sortie.lieu.ville,
      lieu : this.sortie.lieu,
      rue : this.sortie.lieu.rue,
      codePostal : this.sortie.lieu.ville.codePostal,
      latitude : this.sortie.lieu.latitude,
      longitude : this.sortie.lieu.longitude
    });
  }

  onSubmitForm(buttonID: string) {
    const formValue = this.SortieForm.value;

    let etat ;
    if (buttonID === 'publier'){
      etat = new Etat('Ouverte', 2) ;
    }

    let lieuChoisi:Lieu = null ;

    for(let lieu of this.lieuService.lieuxSelectionne){
      if(lieu.id == formValue['lieu']){
        lieuChoisi = lieu;
      }
    }
    if(lieuChoisi == null) {
      lieuChoisi = this.sortie.lieu ;
    }
    const nouvelleSortie = new Sortie(
      formValue['nom'],
      null,
      formValue['date'],
      formValue['duree'],
      formValue['dateLimite'],
      formValue['nbInscriptionMax'],
      formValue['infosSortie'],
      lieuChoisi,
      etat,
      null,
      this.sortie.participants,
      this.sortie.id
    );

    console.log('Nouvelle sortie créée par le formulaire : ') ;
    console.log(nouvelleSortie);
    console.log("\nEn JSON :") ;
    console.log(JSON.stringify(this.sortie)) ;
    this.sortieService.setSortieAffichee(this.sortie) ;
    this.sortieService.editSortie(nouvelleSortie).then(
      () => {
        console.log("ici redirection vers l'accueil = succès");
        this.router.navigate(['/']);
      }
      ,
      () => {
        console.log("ici redirection vers editsortie = echec");
      });
  }

  supprimer() {

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
    console.log(this.lieuService.lieuxSelectionne);
    console.log("Quelle ville est sélectionnée?");
    console.log((villeSelectionnee.options[villeSelectionnee.selectedIndex]).value);
    console.log((villeSelectionnee.options[villeSelectionnee.selectedIndex]).textContent);*/
    this.lieux = [] ;
    this.lieux = this.lieuService.lieuxSelectionne ;
  }

  villeFormAppend(divId : string) {
    this.villeAffichee = !this.villeAffichee ;
    this.villeNonAffichee = !this.villeNonAffichee ;
  }

  lieuFormAppend(buttonId : string) {
    this.lieuAffiche = !this.lieuAffiche ;
    this.lieuNonAffiche = !this.lieuNonAffiche ;
  }

  clearMessageSucces(){
    this.messageService.messageSucces = '' ;
  }

  clearMessageErreur(){
    this.messageService.messageErreur = '' ;
  }

  refresh($event) {
    console.log("On recharge !")
    this.villeService.getVilles().then();
    this.villes = [] ;
    this.villes = this.villeService.villes ;
    this.lieuService.getLieux().then();
    this.lieux = [] ;
    this.lieux = this.lieuService.lieuxSelectionne ;
  }

}
