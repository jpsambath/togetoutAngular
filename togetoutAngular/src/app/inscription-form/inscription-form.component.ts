import { Component, OnInit } from '@angular/core';

import { Participant } from "../participant";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  private reponse;
  inscriptionForm : FormGroup;

  constructor(private authService : AuthService, private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router){

  }
  ngOnInit(){
    this.inscriptionForm = this.formBuilder.group({
      pseudo : '',
      nom : '',
      mail : '',
      motDePasse: ''
    });
  }

  onSubmitForm(){
    const formValue = this.inscriptionForm.value;
    const nouveauParticipant = new Participant(
      formValue['pseudo'],
      formValue['nom'],
      null,
      null,
      formValue['mail'],
      formValue['motDePasse'],
      false,
      true,
      null
    );
    console.log(nouveauParticipant);

    this.authService.register(nouveauParticipant).then(response => {
        this.router.navigate([''])
      }
    );

  }

  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }

}
