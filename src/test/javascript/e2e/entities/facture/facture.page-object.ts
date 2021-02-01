import { element, by, ElementFinder } from 'protractor';

export class FactureComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-facture div table .btn-danger'));
  title = element.all(by.css('jhi-facture div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class FactureUpdatePage {
  pageTitle = element(by.id('jhi-facture-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  numeroInput = element(by.id('field_numero'));
  dateDelivranceInput = element(by.id('field_dateDelivrance'));
  dateLimitePaiementInput = element(by.id('field_dateLimitePaiement'));
  consommationInput = element(by.id('field_consommation'));
  etatInput = element(by.id('field_etat'));
  typeFactureSelect = element(by.id('field_typeFacture'));

  clientSelect = element(by.id('field_client'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNumeroInput(numero: string): Promise<void> {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput(): Promise<string> {
    return await this.numeroInput.getAttribute('value');
  }

  async setDateDelivranceInput(dateDelivrance: string): Promise<void> {
    await this.dateDelivranceInput.sendKeys(dateDelivrance);
  }

  async getDateDelivranceInput(): Promise<string> {
    return await this.dateDelivranceInput.getAttribute('value');
  }

  async setDateLimitePaiementInput(dateLimitePaiement: string): Promise<void> {
    await this.dateLimitePaiementInput.sendKeys(dateLimitePaiement);
  }

  async getDateLimitePaiementInput(): Promise<string> {
    return await this.dateLimitePaiementInput.getAttribute('value');
  }

  async setConsommationInput(consommation: string): Promise<void> {
    await this.consommationInput.sendKeys(consommation);
  }

  async getConsommationInput(): Promise<string> {
    return await this.consommationInput.getAttribute('value');
  }

  async setEtatInput(etat: string): Promise<void> {
    await this.etatInput.sendKeys(etat);
  }

  async getEtatInput(): Promise<string> {
    return await this.etatInput.getAttribute('value');
  }

  async setTypeFactureSelect(typeFacture: string): Promise<void> {
    await this.typeFactureSelect.sendKeys(typeFacture);
  }

  async getTypeFactureSelect(): Promise<string> {
    return await this.typeFactureSelect.element(by.css('option:checked')).getText();
  }

  async typeFactureSelectLastOption(): Promise<void> {
    await this.typeFactureSelect.all(by.tagName('option')).last().click();
  }

  async clientSelectLastOption(): Promise<void> {
    await this.clientSelect.all(by.tagName('option')).last().click();
  }

  async clientSelectOption(option: string): Promise<void> {
    await this.clientSelect.sendKeys(option);
  }

  getClientSelect(): ElementFinder {
    return this.clientSelect;
  }

  async getClientSelectedOption(): Promise<string> {
    return await this.clientSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class FactureDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-facture-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-facture'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
