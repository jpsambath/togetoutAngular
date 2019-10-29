import {Participant} from "./participant";
import DateTimeFormat = Intl.DateTimeFormat;
import {Lieu} from "./lieu";
import {Etat} from "./etat";
import {Site} from "./site";

export class Sortie {

  constructor(

    public nom?: string,
    public organisateur?: Participant,
    public dateHeureDebut?: String,
    public duree?: String,
    public dateLimiteInscription?: String,
    public nbInscriptionMax?: number,
    public infosSortie?: string,
    public lieu?: Lieu,
    public etat?: Etat,
    site?: Site,
    participants?: Participant[],
    public id?: number

  ) {  }

}
