export interface IAdmin {
  id?: number;
  nom?: string;
  prenom?: string;
  login?: string;
  password?: string;
}

export class Admin implements IAdmin {
  constructor(public id?: number, public nom?: string, public prenom?: string, public login?: string, public password?: string) {}
}
