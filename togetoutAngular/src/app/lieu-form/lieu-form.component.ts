import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Ville} from "../model/ville";
import {Lieu} from "../model/lieu";
import {VilleService} from "../ville.service";
import {LieuService} from "../lieu.service";

@Component({
  selector: 'app-lieu-form',
  templateUrl: './lieu-form.component.html',
  styleUrls: ['./lieu-form.component.css']
})
export class LieuFormComponent implements OnInit {

  lieuForm : FormGroup ;
  villeChoisie : Ville;

  constructor(private lieuService:LieuService ,private villeService:VilleService, private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router, public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.lieuForm = this.formBuilder.group({
      ville : ['', Validators.required],
      nom : ['', Validators.required],
      rue : '',
      latitude : '',
      longitude : ''
    });
  }

  onSubmitForm() {
    const formValue = this.lieuForm.value;

    for(let ville of this.villeService.villes){
      if(ville.id == formValue['ville']){
        this.villeChoisie = ville;
      }
    }

    const nouveauLieu = new Lieu(
      formValue['nom'],
      formValue['rue'],
      formValue['latitude'],
      formValue['longitude'],
      this.villeChoisie
    ) ;
    console.log('Nouveau lieu créée par le formulaire : ')
    console.log(nouveauLieu);
    console.log(JSON.stringify(nouveauLieu));

    this.lieuService.creerLieu(nouveauLieu).then(
      () => {
        console.log("Lieu Créée avec Succès");
      }
      ,
      () => {
        console.log("Lieu Ratée");
      });
  }
}
