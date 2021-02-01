import { IFacture } from 'app/shared/model/facture.model';
import { IReclamation } from 'app/shared/model/reclamation.model';

export interface IClient {
  id?: number;
  nom?: string;
  prenom?: string;
  adresse?: string;
  login?: string;
  password?: string;
  factures?: IFacture[];
  reclamations?: IReclamation[];
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public adresse?: string,
    public login?: string,
    public password?: string,
    public factures?: IFacture[],
    public reclamations?: IReclamation[]
  ) {}
}
