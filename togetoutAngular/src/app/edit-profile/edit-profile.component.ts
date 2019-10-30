import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Participant} from "../model/participant";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm : FormGroup;
  username: string;
  prenom: string ;

  constructor(private messageService:MessageService, private formBuilder: FormBuilder,private router : Router,private authService : AuthService) { }

  ngOnInit() {
    this.authService.getUserInfo().then(
      () => {
        console.log("Récupération Sorties Réussie");

      }
      ,
      () => {
        console.log("Récupération Sorties Ratée");
      });


    this.editForm = this.formBuilder.group({
      username : ['', Validators.required],
      prenom : ['', Validators.required],
      nom : ['', Validators.required],
      telephone : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      passwordconfirm : ['', Validators.required],
      villeRattachement : ['', Validators.required]
    });
  }

  onSubmitForm(){
    const formValue = this.editForm.value;
    const participant = new Participant(
      formValue['username'],
      formValue['nom'],
      formValue['prenom'],
      null,
      formValue['telephone'],
      formValue['email'],
      formValue['password'],
      formValue['passwordconfirm'],
      null,
      null,
      null,
      null,
      null,
      null
    );

    this.authService.editProfile(participant).then(
      () => {
        console.log("ici redirection vers l'accueil = succès");
        this.authService.setAuthenticated(true);
        this.router.navigate(['']);
      }
      ,
      () => {
        console.log("ici redirection vers editProfile = echec");
        this.router.navigate(['/edit-profile']);
      });
  }
}
