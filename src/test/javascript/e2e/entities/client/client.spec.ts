import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ClientComponentsPage, ClientDeleteDialog, ClientUpdatePage } from './client.page-object';

const expect = chai.expect;

describe('Client e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clientComponentsPage: ClientComponentsPage;
  let clientUpdatePage: ClientUpdatePage;
  let clientDeleteDialog: ClientDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Clients', async () => {
    await navBarPage.goToEntity('client');
    clientComponentsPage = new ClientComponentsPage();
    await browser.wait(ec.visibilityOf(clientComponentsPage.title), 5000);
    expect(await clientComponentsPage.getTitle()).to.eq('gestFactureProjectApp.client.home.title');
    await browser.wait(ec.or(ec.visibilityOf(clientComponentsPage.entities), ec.visibilityOf(clientComponentsPage.noResult)), 1000);
  });

  it('should load create Client page', async () => {
    await clientComponentsPage.clickOnCreateButton();
    clientUpdatePage = new ClientUpdatePage();
    expect(await clientUpdatePage.getPageTitle()).to.eq('gestFactureProjectApp.client.home.createOrEditLabel');
    await clientUpdatePage.cancel();
  });

  it('should create and save Clients', async () => {
    const nbButtonsBeforeCreate = await clientComponentsPage.countDeleteButtons();

    await clientComponentsPage.clickOnCreateButton();

    await promise.all([
      clientUpdatePage.setNomInput('nom'),
      clientUpdatePage.setPrenomInput('prenom'),
      clientUpdatePage.setAdresseInput('adresse'),
      clientUpdatePage.setLoginInput('login'),
      clientUpdatePage.setPasswordInput('password'),
    ]);

    expect(await clientUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await clientUpdatePage.getPrenomInput()).to.eq('prenom', 'Expected Prenom value to be equals to prenom');
    expect(await clientUpdatePage.getAdresseInput()).to.eq('adresse', 'Expected Adresse value to be equals to adresse');
    expect(await clientUpdatePage.getLoginInput()).to.eq('login', 'Expected Login value to be equals to login');
    expect(await clientUpdatePage.getPasswordInput()).to.eq('password', 'Expected Password value to be equals to password');

    await clientUpdatePage.save();
    expect(await clientUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Client', async () => {
    const nbButtonsBeforeDelete = await clientComponentsPage.countDeleteButtons();
    await clientComponentsPage.clickOnLastDeleteButton();

    clientDeleteDialog = new ClientDeleteDialog();
    expect(await clientDeleteDialog.getDialogTitle()).to.eq('gestFactureProjectApp.client.delete.question');
    await clientDeleteDialog.clickOnConfirmButton();

    expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
