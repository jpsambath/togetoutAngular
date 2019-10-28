import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Etat} from "../model/etat";
import {Sortie} from "../model/sortie";
import {VilleFormComponent} from "../ville-form/ville-form.component";
import {LieuFormComponent} from "../lieu-form/lieu-form.component";
import { SortieService } from "../sortie.service";

@Component({
  selector: 'app-edit-sortie',
  templateUrl: './edit-sortie.component.html',
  styleUrls: ['./edit-sortie.component.css']
})
export class EditSortieComponent implements OnInit {
  newSortieForm : FormGroup;
  ville = VilleFormComponent ;
  lieu = LieuFormComponent ;
  private villeAffichee = false ;
  private villeNonAffichee = !this.villeAffichee ;
  private lieuAffiche= false ;
  private lieuNonAffiche= !this.lieuAffiche ;

  constructor(private formBuilder: FormBuilder, private router : Router, public viewContainerRef: ViewContainerRef,private SortieService : SortieService) { }

  ngOnInit() {
    this.newSortieForm = this.formBuilder.group({
      nom : ['', Validators.required],
      date : ['', Validators.required],
      dateLimite : '',
      nbInscriptionMax : 0,
      duree : 0,
      infosSortie : '',
      site : null,
      ville : '',
      lieu : '',
      rue : '',
      codePostal : '',
      latitude : '',
      longitude : ''
    });
  }

  onSubmitForm(buttonID: string) {
    const formValue = this.newSortieForm.value;
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
