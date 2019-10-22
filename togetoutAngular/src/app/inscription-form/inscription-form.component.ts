import { Component, OnInit } from '@angular/core';

import { Participant } from "../participant";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {

  inscriptionForm : FormGroup;

  constructor(private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router){

  }
  ngOnInit(){
    this.inscriptionForm = this.formBuilder.group({
      nom : '',
      prenom : '',
      telephone : '',
      mail : ''
    });
  }

  onSubmitForm(){
    const formValue = this.inscriptionForm.value;
    const nouveauParticipant = new Participant(
      formValue['nom'],
      formValue['prenom'],
      formValue['telephone'],
      formValue['mail'],
      false,
      true,
      null
    );
    //this.participantService.ajouterParticipant(nouveauParticipant);
    //json.encode(nouveauParticipant) envoyer
    this.router.navigate(['/accueil']);

  }

}
