import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Participant} from "../model/participant";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm : FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
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

  }
  /*
    public username?: string,
    public nom?: string,
    public prenom?: string,
    public roles?: string[],
    public telephone?: string,
    public email?: string,
    public password?:string,
    public plainPassword?: string,
    public sorties?: Sortie[],
    public sortieCreer?: Sortie[],
    public site?: Site,
    public administrateur?: boolean,
    public actif?: boolean,
    public id?: number
   */
}
