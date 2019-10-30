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

  constructor(private messageService:MessageService, private formBuilder: FormBuilder,private router : Router,private authService : AuthService) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      username : [this.authService.user.username, Validators.required],
      prenom : [this.authService.user.prenom, Validators.required],
      nom : [this.authService.user.nom, Validators.required],
      telephone : [this.authService.user.telephone, Validators.required],
      email : [this.authService.user.email, [Validators.required, Validators.email]],
      password : ['', Validators.required],
      passwordconfirm : ['', Validators.required],
      villeRattachement : [this.authService.user.site.nom, Validators.required]
    });
  }

  onSubmitForm(){
    const formValue = this.editForm.value;

    /*
    if (formValue['password'] != formValue['passwordconfirm']){
      this.messageService.messageErreur = "La confirmation n'est pas valide !";
      return;
    }
     */

    const participant = new Participant(
      formValue['username'],
      formValue['nom'],
      formValue['prenom'],
      this.authService.user.role,
      formValue['telephone'],
      formValue['email'],
      formValue['password'],
      null,
      this.authService.user.site,
      this.authService.user.administrateur,
      this.authService.user.actif,
      this.authService.user.id,
      this.authService.user.avatar
    );

    console.log(participant)

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

  clearMessageSucces(){
    this.messageService.messageSucces = '' ;
  }

  clearMessageErreur(){
    this.messageService.messageErreur = '' ;
  }

}
