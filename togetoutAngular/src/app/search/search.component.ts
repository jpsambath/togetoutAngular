import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../message.service";
import {AuthService} from "../auth.service";
import {VilleService} from "../ville.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm : FormGroup;

  constructor(private messageService:MessageService, private authService:AuthService, private villeService:VilleService, private router:Router, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({

    });

  }

  ngOnInit() {
    this.villeService.getVilles().then();

    this.searchForm = this.formBuilder.group({
      ville : '',
      recherche : '',
      dateDebut : '',
      heureDebut: '',
      dateFin : '',
      heureFin : '',
      cbxOrganisateur: false,
      cbxInscrit: false,
      cbxNonInscrit: false,
      cbxPassees:false
    });

  }


  onSubmitForm(){

  }

  clearMessageSucces(){
    this.messageService.messageSucces = '' ;
  }

  clearMessageErreur(){
    this.messageService.messageErreur = '' ;
  }

}
