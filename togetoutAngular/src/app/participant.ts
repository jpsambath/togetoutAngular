export class Participant {

  constructor(

    public username?: string,
    public nom?: string,
    public prenom?: string,
    public telephone?: string,
    public email?: string,
    public password?: string,
    public administrateur?: boolean,
    public actif?: boolean,
    public id?: number

  ) {  }

}
