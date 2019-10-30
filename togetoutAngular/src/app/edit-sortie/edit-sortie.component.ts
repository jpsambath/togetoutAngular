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

@Component({
  selector: 'app-edit-sortie',
  templateUrl: './edit-sortie.component.html',
  styleUrls: ['./edit-sortie.component.css']
})
export class EditSortieComponent implements OnInit {
  SortieForm : FormGroup;
  ville = VilleFormComponent ;
  lieu = LieuFormComponent ;
  private villeAffichee = false ;
  private villeNonAffichee = !this.villeAffichee ;
  private lieuAffiche= false ;
  private lieuNonAffiche= !this.lieuAffiche ;
  sortie: Sortie ;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private router: Router, public viewContainerRef: ViewContainerRef,private sortieService: SortieService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.sortie = this.sortieService.getSortieAffichee() ;
    this.SortieForm = this.formBuilder.group({
      nom : [this.sortie.nom, Validators.required],
      date : [this.datepipe.transform(this.sortie.dateHeureDebut, 'dd/MM/yyyy - HH:mm'), Validators.required],
      dateLimite : this.datepipe.transform(this.sortie.dateLimiteInscription, 'dd/MM/yyyy - HH:mm'),
      nbInscriptionMax : this.sortie.nbInscriptionMax,
      duree : this.datepipe.transform(this.sortie.dateLimiteInscription, 'HH:mm'),
      infosSortie : this.sortie.infosSortie,
      site : this.sortie.site.nom,
      ville : this.sortie.lieu.ville.nom,
      lieu : this.sortie.lieu.nom,
      rue : this.sortie.lieu.rue,
      codePostal : this.sortie.lieu.ville.codePostal,
      latitude : this.sortie.lieu.latitude,
      longitude : this.sortie.lieu.longitude
    });
  }

  onSubmitForm(buttonID: string) {
    const formValue = this.SortieForm.value;
    let etat ;
    if(buttonID === 'enregistrer') {
      etat = new Etat('Créée', null) ;
    }
    else if (buttonID === 'publier'){
      etat = new Etat('Ouverte', null) ;
    }
    const nouvelleSortie = new Sortie(
      formValue['nom'],
      null,
      formValue['date'],
      formValue['duree'],
      formValue['dateLimite'],
      formValue['nbInscriptionMax'],
      formValue['infosSortie'],
      null,
      etat,
      null,
      [],
      null
    );

    console.log('Nouvelle sortie créée par le formulaire : ')
    console.log(nouvelleSortie);
/*
    this.SortieService.editSortie(nouvelleSortie).then(
      () => {
        console.log("ici redirection vers l'accueil = succès");
        this.SortieService.setAuthenticated(true);
        this.router.navigate(['']);
      }
      ,
      () => {
        console.log("ici redirection vers editsortie = echec");
        this.router.navigate(['/edit-sortie']);
      });*/
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
