import { IFacture } from 'app/shared/model/facture.model';
import { IClient } from 'app/shared/model/client.model';

export interface IReclamation {
  id?: number;
  objet?: string;
  libelle?: string;
  facture?: IFacture;
  client?: IClient;
}

export class Reclamation implements IReclamation {
  constructor(public id?: number, public objet?: string, public libelle?: string, public facture?: IFacture, public client?: IClient) {}
}
