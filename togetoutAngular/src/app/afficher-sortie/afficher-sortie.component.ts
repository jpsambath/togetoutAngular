import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { SortieService } from "../sortie.service";
import {VilleFormComponent} from "../ville-form/ville-form.component";
import {LieuFormComponent} from "../lieu-form/lieu-form.component";
import {MessageService} from "../message.service";
import {Sortie} from "../model/sortie";
import {DatePipe, formatDate} from "@angular/common";
import {Participant} from "../model/participant";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-afficher-sortie',
  templateUrl: './afficher-sortie.component.html',
  styleUrls: ['./afficher-sortie.component.css']
})
export class AfficherSortieComponent implements OnInit {

  afficherSortie : FormGroup;
  ville = VilleFormComponent ;
  lieu = LieuFormComponent ;
  sortie: Sortie ;
  constructor(private messageService:MessageService, private formBuilder: FormBuilder, private authService: AuthService, private router : Router, public viewContainerRef: ViewContainerRef,private sortieService : SortieService, public datepipe: DatePipe) { }

  ngOnInit() {
    console.log("Initialisation de la page de détails.")
    this.sortie = this.sortieService.getSortieAffichee() ;
    console.log(this.sortie) ;
    this.afficherSortie = this.formBuilder.group({
      nom : [this.sortie.nom, Validators.required],
      date : [this.datepipe.transform(this.sortie.dateHeureDebut, 'dd/MM/yyyy - HH:mm'), Validators.required],
      dateLimite : this.datepipe.transform(this.sortie.dateLimiteInscription, 'dd/MM/yyyy - HH:mm'),
      nbInscriptionMax : this.sortie.nbInscriptionMax,
      duree : this.datepipe.transform(this.sortie.dateLimiteInscription, 'HH:mm'),
      infosSortie : this.sortie.infosSortie,
      site : this.sortie.site.nom,
      ville : this.sortie.lieu.ville.nom,
      lieu : this.sortie.lieu.nom,
      rue : this.sortie.lieu.rue,
      codePostal : this.sortie.lieu.ville.codePostal,
      latitude : this.sortie.lieu.latitude,
      longitude : this.sortie.lieu.longitude
    });
  }

  public afficherProfil(participant: Participant) {
    this.authService.setProfilAffiche(participant) ;
    if(participant.id == this.authService.user.id)
      this.router.navigate(["/editProfile"]) ;
    else
      this.router.navigate(["/afficheProfil"]) ;
  }
}
