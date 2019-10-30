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
    this.searchForm = this.formBuilder.group({
      ville : this.villeService.getVilles(),
      recherche : '',
      heure : '',
      dateLimite : '',
      heureLimite : 0,
      nbInscriptionMax : 0,
      duree : 0,
      infosSortie : '',
      site : new FormControl({value: '', disabled: true}),
      lieu : '',
      rue : new FormControl({value: '', disabled: true}),
      codePostal : new FormControl({value: '', disabled: true}),
      latitude : new FormControl({value: '', disabled: true}),
      longitude : new FormControl({value: '', disabled: true})
    });

  }


  onSubmitForm(){

  }

}
