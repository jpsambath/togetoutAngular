import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sortie-form',
  templateUrl: './sortie-form.component.html',
  styleUrls: ['./sortie-form.component.css']
})
export class SortieFormComponent implements OnInit {

  sortieForm : FormGroup;

  constructor(private formBuilder: FormBuilder/*,private participantService: participantService*/, private router : Router) { }

  ngOnInit() {
    this.sortieForm = this.formBuilder.group({
      login : '',
      motDePasse : ''
    });
  }

}
