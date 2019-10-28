import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VilleFormComponent} from "../ville-form/ville-form.component";
import {LieuFormComponent} from "../lieu-form/lieu-form.component";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Sortie} from "../model/sortie";
import {Etat} from "../model/etat";
import { SortieService } from "../sortie.service";

@Component({
  selector: 'app-annuler-sortie',
  templateUrl: './annuler-sortie.component.html',
  styleUrls: ['./annuler-sortie.component.css']
})
export class AnnulerSortieComponent implements OnInit {

  sortieAnnuler : FormGroup;
  ville = VilleFormComponent ;
  lieu = LieuFormComponent ;
  constructor(private formBuilder: FormBuilder, private router : Router, public viewContainerRef: ViewContainerRef,private SortieService : SortieService) { }

  ngOnInit() {
    this.sortieAnnuler = this.formBuilder.group({
      nom : '',
      date : '',
      site : null,
      lieu : '',
      motif : ['', Validators.required]
    });
  }

  onSubmitForm(){
    const formValue = this.sortieAnnuler.value;
    let etat = new Etat('Annulée', null) ;
    const sortieAnnulee = new Sortie(
      null,
      null,
      null,
      null,
      null,
      null,
      formValue['motif'],
      null,
      etat,
      null,
      [],
      null
    );

    this.SortieService.annuleeSortie(sortieAnnulee).then(
      () => {
        console.log("ici redirection vers l'accueil = succès");
        this.SortieService.setAuthenticated(true);
        this.router.navigate(['']);
      }
      ,
      () => {
        console.log("ici redirection vers annuler-sortie = echec");
        this.router.navigate(['/annuler-sortie']);
      });
  }
}
