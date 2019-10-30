import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Ville} from "../model/ville";
import {VilleService} from "../ville.service";

@Component({
  selector: 'app-ville-form',
  templateUrl: './ville-form.component.html',
  styleUrls: ['./ville-form.component.css']
})
export class VilleFormComponent implements OnInit {

  villeForm : FormGroup ;

  constructor(private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router, public viewContainerRef: ViewContainerRef, private villeService: VilleService) { }

  ngOnInit() {
    this.villeForm = this.formBuilder.group({
      nom : ['', Validators.required],
      codePostal : ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.villeForm.value;
    const nouvelleVille = new Ville(
      formValue['nom'],
      formValue['codePostal'],
      null
    ) ;
    console.log('Nouvelle ville créée par le formulaire : ')
    console.log(nouvelleVille);
    console.log("*---------------JSON POUR LOIC---------------------");
    console.log(JSON.stringify(nouvelleVille));

    this.villeService.creerVille(nouvelleVille).then(
      () => {
        console.log("Ville Créée avec Succès");
      }
      ,
      () => {
        console.log("Création ville Ratée");
      });



    console.log('Nouvelle ville créée par le formulaire : ')
    console.log(nouvelleVille);
  }

}
