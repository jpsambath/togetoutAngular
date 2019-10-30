import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Participant} from "../model/participant";
import { AuthService} from "../auth.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm : FormGroup;
  participant : Participant;

  constructor(private messageService:MessageService, private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router, private authService:AuthService){

  }
  ngOnInit(){

    this.loginForm = this.formBuilder.group({
      login : ['', Validators.required],
      plainPassword : ['', Validators.required],
      rememberMe : true
    });
  }

  onSubmitForm(){
    const formValue = this.loginForm.value;
    const mailRegex = new RegExp('^[a-z]+[\w\.\-]*@(?:[a-z\.\-_0-9]*\.)*([\w\.\-]+)\.[a-z]{2,}$', 'gmi') ;
    if(formValue['login'].match(mailRegex)) {
      this.participant = new Participant(
        null,
        null,
        null,
        [],
        null,
        formValue['login'],
        formValue['plainPassword'],
        null,
        null,
        false,
        true,
        null,
        null
      );
    }
    else {
      this.participant = new Participant(
        formValue['login'],
        null,
        null,
        [],
        null,
        null,
        formValue['plainPassword'],
        null,
        null,
        false,
        true,
        null,
        null
      );
    }

    this.authService.login(this.participant).then(
      () => {
        console.log("Connexion Réussie");
        this.router.navigate(['/']);
      }
      ,
      () => {
        console.log("Connexion Ratée");
        this.router.navigate(['/login']);
      });



    //this.participantService.connecterParticipant(participant);
    //Si la connexion a fonctionné this.router.navigate(['/accueil']);

  }

  clearMessageSucces(){
    this.messageService.messageSucces = '' ;
  }

  clearMessageErreur(){
    this.messageService.messageErreur = '' ;
  }
}
