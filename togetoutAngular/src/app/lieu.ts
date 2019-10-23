import {Participant} from "./participant";
import {Ville} from "./ville";

export class Lieu {

  constructor(

    public nom?: string,
    public rue?: string,
    public latitude?: number,
    public longitude?: number,
    public ville?: Ville,
    public id?: number

  ) {  }

}
