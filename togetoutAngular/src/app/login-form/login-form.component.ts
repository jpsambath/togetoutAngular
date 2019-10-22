import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Participant} from "../participant";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router){

  }
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      login : '',
      motDePasse : ''
    });
  }

  onSubmitForm(){
    const formValue = this.loginForm.value;
    const participant = new Participant(
      formValue['login'],
      null,
      null,
      null,
      formValue['login'],
      formValue['motDePasse'],
      false,
      true,
      null
    );
    //this.participantService.connecterParticipant(participant);
    //Si la connexion a fonctionné this.router.navigate(['/accueil']);

  }
}
