import { Component, OnInit } from '@angular/core';

import { Participant } from "../model/participant";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  private statut;
  private reponse;
  inscriptionForm : FormGroup;

  constructor(private messageService:MessageService,private authService : AuthService, private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router){

  }
  ngOnInit(){
    this.inscriptionForm = this.formBuilder.group({
      username : ['', Validators.required],
      nom : ['', Validators.required],
      mail : ['', [Validators.required, Validators.email]],
      plainPassword: ['', Validators.required]
    });
  }

  onSubmitForm(){
    const formValue = this.inscriptionForm.value;
    const nouveauParticipant = new Participant(
      formValue['username'],
      formValue['nom'],
      null,
      ['ROLE_USER'],
      null,
      formValue['mail'],
      "",
      formValue['plainPassword'],
      null,
      false,
      true,
      null,
      null

    );

    this.authService.register(nouveauParticipant).then(
      () => {
        console.log("Inscription Réussie");
        this.router.navigate(['/login']);
      }
    ,
      () => {
        console.log("Inscription Ratée");
        this.router.navigate(['/inscription']);
    });

  }

  clearMessageSucces(){
    this.messageService.messageSucces = '' ;
  }

  clearMessageErreur(){
    this.messageService.messageErreur = '' ;
  }

}
