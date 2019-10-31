import {Component, OnInit, ViewContainerRef, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Ville} from "../model/ville";
import {VilleService} from "../ville.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-ville-form',
  templateUrl: './ville-form.component.html',
  styleUrls: ['./ville-form.component.css']
})
export class VilleFormComponent implements OnInit {

  villeForm : FormGroup ;
  @Output() ajoutEvent = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router, public viewContainerRef: ViewContainerRef, private villeService: VilleService, private messageService: MessageService) { }

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
        this.ajoutEvent.emit("On a cliqué !");
      }
      ,
      () => {
        console.log("Création ville Ratée");
      });



    console.log('Nouvelle ville créée par le formulaire : ')
    console.log(nouvelleVille);
  }

  clearMessageSucces(){
    this.messageService.messageSucces = '' ;
  }

  clearMessageErreur(){
    this.messageService.messageErreur = '' ;
  }

}
