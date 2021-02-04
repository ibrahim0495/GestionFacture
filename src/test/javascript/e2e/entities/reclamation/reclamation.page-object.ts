import { element, by, ElementFinder } from 'protractor';

export class ReclamationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-reclamation div table .btn-danger'));
  title = element.all(by.css('jhi-reclamation div h2#page-heading span')).first();
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

export class ReclamationUpdatePage {
  pageTitle = element(by.id('jhi-reclamation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  objetInput = element(by.id('field_objet'));
  libelleInput = element(by.id('field_libelle'));

  factureSelect = element(by.id('field_facture'));
  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setObjetInput(objet: string): Promise<void> {
    await this.objetInput.sendKeys(objet);
  }

  async getObjetInput(): Promise<string> {
    return await this.objetInput.getAttribute('value');
  }

  async setLibelleInput(libelle: string): Promise<void> {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput(): Promise<string> {
    return await this.libelleInput.getAttribute('value');
  }

  async factureSelectLastOption(): Promise<void> {
    await this.factureSelect.all(by.tagName('option')).last().click();
  }

  async factureSelectOption(option: string): Promise<void> {
    await this.factureSelect.sendKeys(option);
  }

  getFactureSelect(): ElementFinder {
    return this.factureSelect;
  }

  async getFactureSelectedOption(): Promise<string> {
    return await this.factureSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class ReclamationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reclamation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reclamation'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
