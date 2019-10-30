import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VilleFormComponent} from "../ville-form/ville-form.component";
import {LieuFormComponent} from "../lieu-form/lieu-form.component";
import {Sortie} from "../model/sortie";
import {MessageService} from "../message.service";
import {Router} from "@angular/router";
import {SortieService} from "../sortie.service";
import {DatePipe} from "@angular/common";
import {Participant} from "../model/participant";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-afficher-profil',
  templateUrl: './afficher-profil.component.html',
  styleUrls: ['./afficher-profil.component.css']
})

export class AfficherProfilComponent implements OnInit {


  afficherProfil : FormGroup;

  profil: Participant;

  private profilService: any;

  constructor(private messageService:MessageService, private formBuilder: FormBuilder, private router : Router, public viewContainerRef: ViewContainerRef,private authService : AuthService, public datepipe: DatePipe) { }

  ngOnInit() {
    console.log("Initialisation de la page de profil.");
    this.profil = this.authService.getProfilAffiche();
    console.log(this.profil) ;
    this.afficherProfil = this.formBuilder.group({
      nom : [this.profil.nom],
      prenom : [this.profil.prenom],
      username : [this.profil.username],
      email : [this.profil.email],
      telephone : [this.profil.telephone],
      site : [this.profil.site],
    })
  }



}
