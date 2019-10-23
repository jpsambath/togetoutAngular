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
    const mailRegex = new RegExp('^[a-z]+[\w\.\-]*@(?:[a-z\.\-_0-9]*\.)*([\w\.\-]+)\.[a-z]{2,}$', 'gmi') ;
    if(formValue['login'].match(mailRegex)) {
      const participant = new Participant(
        null,
        null,
        null,
        null,
        formValue['login'],
        formValue['motDePasse'],
        null,
        null,
        null,
        null,
        false,
        true,
        null
      );
    }
    else {
      const participant = new Participant(
        formValue['login'],
        null,
        null,
        null,
        null,
        formValue['motDePasse'],
        null,
        null,
        null,
        null,
        false,
        true,
        null
      );
    }

    //this.participantService.connecterParticipant(participant);
    //Si la connexion a fonctionné this.router.navigate(['/accueil']);

  }
}
