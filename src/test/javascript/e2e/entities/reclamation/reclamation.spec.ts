import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReclamationComponentsPage, ReclamationDeleteDialog, ReclamationUpdatePage } from './reclamation.page-object';

const expect = chai.expect;

describe('Reclamation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reclamationComponentsPage: ReclamationComponentsPage;
  let reclamationUpdatePage: ReclamationUpdatePage;
  let reclamationDeleteDialog: ReclamationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Reclamations', async () => {
    await navBarPage.goToEntity('reclamation');
    reclamationComponentsPage = new ReclamationComponentsPage();
    await browser.wait(ec.visibilityOf(reclamationComponentsPage.title), 5000);
    expect(await reclamationComponentsPage.getTitle()).to.eq('gestFactureProjectApp.reclamation.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(reclamationComponentsPage.entities), ec.visibilityOf(reclamationComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Reclamation page', async () => {
    await reclamationComponentsPage.clickOnCreateButton();
    reclamationUpdatePage = new ReclamationUpdatePage();
    expect(await reclamationUpdatePage.getPageTitle()).to.eq('gestFactureProjectApp.reclamation.home.createOrEditLabel');
    await reclamationUpdatePage.cancel();
  });

  it('should create and save Reclamations', async () => {
    const nbButtonsBeforeCreate = await reclamationComponentsPage.countDeleteButtons();

    await reclamationComponentsPage.clickOnCreateButton();

    await promise.all([
      reclamationUpdatePage.setObjetInput('objet'),
      reclamationUpdatePage.setLibelleInput('libelle'),
      reclamationUpdatePage.factureSelectLastOption(),
      reclamationUpdatePage.userSelectLastOption(),
    ]);

    expect(await reclamationUpdatePage.getObjetInput()).to.eq('objet', 'Expected Objet value to be equals to objet');
    expect(await reclamationUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');

    await reclamationUpdatePage.save();
    expect(await reclamationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await reclamationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Reclamation', async () => {
    const nbButtonsBeforeDelete = await reclamationComponentsPage.countDeleteButtons();
    await reclamationComponentsPage.clickOnLastDeleteButton();

    reclamationDeleteDialog = new ReclamationDeleteDialog();
    expect(await reclamationDeleteDialog.getDialogTitle()).to.eq('gestFactureProjectApp.reclamation.delete.question');
    await reclamationDeleteDialog.clickOnConfirmButton();

    expect(await reclamationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
