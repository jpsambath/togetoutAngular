import {Site} from "./site";

export class Participant {

  constructor(

    public pseudo?: string,
    public nom?: string,
    public prenom?: string,
    public telephone?: string,
    public mail?: string,
    public motDePasse?: string,
    public site?: Site,
    public administrateur?: boolean,
    public actif?: boolean,
    public id?: number

  ) {  }

}
