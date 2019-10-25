import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Ville} from "../model/ville";
import {Lieu} from "../model/lieu";

@Component({
  selector: 'app-lieu-form',
  templateUrl: './lieu-form.component.html',
  styleUrls: ['./lieu-form.component.css']
})
export class LieuFormComponent implements OnInit {

  lieuForm : FormGroup ;

  constructor(private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router, public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.lieuForm = this.formBuilder.group({
      ville : '',
      nom : '',
      rue : '',
      latitude : '',
      longitude : ''
    });
  }

  ngOnSubmit() {
    const formValue = this.lieuForm.value;
    const nouveauLieu = new Lieu(
      formValue['nom'],
      formValue['codePostal'],
      null
    ) ;
    console.log('Nouveau lieu créée par le formulaire : ')
    console.log(nouveauLieu);
  }

}
