import { Moment } from 'moment';
import { IReclamation } from 'app/shared/model/reclamation.model';
import { IClient } from 'app/shared/model/client.model';
import { TypeFacture } from 'app/shared/model/enumerations/type-facture.model';

export interface IFacture {
  id?: number;
  numero?: number;
  dateDelivrance?: Moment;
  dateLimitePaiement?: Moment;
  consommation?: string;
  etat?: string;
  typeFacture?: TypeFacture;
  factures?: IReclamation[];
  client?: IClient;
}

export class Facture implements IFacture {
  constructor(
    public id?: number,
    public numero?: number,
    public dateDelivrance?: Moment,
    public dateLimitePaiement?: Moment,
    public consommation?: string,
    public etat?: string,
    public typeFacture?: TypeFacture,
    public factures?: IReclamation[],
    public client?: IClient
  ) {}
}
