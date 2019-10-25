import {Site} from "./site";
import {Sortie} from "./sortie";

export class Participant {

  constructor(

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

  ) {  }

}
