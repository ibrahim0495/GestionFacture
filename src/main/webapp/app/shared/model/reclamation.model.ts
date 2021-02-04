import { IFacture } from 'app/shared/model/facture.model';
import { IUser } from 'app/core/user/user.model';

export interface IReclamation {
  id?: number;
  objet?: string;
  libelle?: string;
  facture?: IFacture;
  user?: IUser;
}

export class Reclamation implements IReclamation {
  constructor(public id?: number, public objet?: string, public libelle?: string, public facture?: IFacture, public user?: IUser) {}
}
