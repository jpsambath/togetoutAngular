import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { SortieService } from "../sortie.service";
import {VilleFormComponent} from "../ville-form/ville-form.component";
import {LieuFormComponent} from "../lieu-form/lieu-form.component";

@Component({
  selector: 'app-afficher-sortie',
  templateUrl: './afficher-sortie.component.html',
  styleUrls: ['./afficher-sortie.component.css']
})
export class AfficherSortieComponent implements OnInit {

  afficherSortie : FormGroup;
  ville = VilleFormComponent ;
  lieu = LieuFormComponent ;
  constructor(private formBuilder: FormBuilder, private router : Router, public viewContainerRef: ViewContainerRef,private SortieService : SortieService) { }

  ngOnInit() {
    this.afficherSortie = this.formBuilder.group({
      nom : ['', Validators.required],
      date : ['', Validators.required],
      dateLimite : '',
      nbInscriptionMax : 0,
      duree : 0,
      infosSortie : '',
      site : null,
      ville : '',
      lieu : '',
      rue : '',
      codePostal : '',
      latitude : '',
      longitude : ''
    });
  }
}
