import { Component, OnInit } from '@angular/core';

import { Participant } from "../model/participant";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  private statut;
  private reponse;
  inscriptionForm : FormGroup;

  constructor(private authService : AuthService, private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router){

  }
  ngOnInit(){
    this.inscriptionForm = this.formBuilder.group({
      pseudo : '',
      nom : '',
      mail : '',
      plainPassword: ''
    });
  }

  onSubmitForm(){
    const formValue = this.inscriptionForm.value;
    const nouveauParticipant = new Participant(
      formValue['pseudo'],
      formValue['nom'],
      null,
      ['ROLE_USER'],
      null,
      formValue['mail'],
      null,
      formValue['plainPassword'],
      [],
      [],
      null,
      false,
      true,
      null

    );
    console.log('Nouveau participant formé par le formulaire : ')
    console.log(nouveauParticipant);

    this.authService.register(nouveauParticipant).then(
      () => {
        console.log("ici redirection vers l'accueil = succès");
        this.authService.setAuthenticated(true);
        this.router.navigate(['']);
      }
    ,
      () => {
        console.log("ici redirection vers inscription = echec");
        this.router.navigate(['/inscription']);
    });

  }

}
