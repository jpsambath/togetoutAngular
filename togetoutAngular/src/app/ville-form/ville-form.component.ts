import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Ville} from "../model/ville";

@Component({
  selector: 'app-ville-form',
  templateUrl: './ville-form.component.html',
  styleUrls: ['./ville-form.component.css']
})
export class VilleFormComponent implements OnInit {

  villeForm : FormGroup ;

  constructor(private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router, public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.villeForm = this.formBuilder.group({
      nom : '',
      codePostal : ''
    });
  }

  ngOnSubmit() {
    const formValue = this.villeForm.value;
    const nouvelleVille = new Ville(
      formValue['nom'],
      formValue['codePostal'],
      null
    ) ;
    console.log('Nouvelle ville créée par le formulaire : ')
    console.log(nouvelleVille);
  }

}
