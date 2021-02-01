import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AdminComponentsPage, AdminDeleteDialog, AdminUpdatePage } from './admin.page-object';

const expect = chai.expect;

describe('Admin e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adminComponentsPage: AdminComponentsPage;
  let adminUpdatePage: AdminUpdatePage;
  let adminDeleteDialog: AdminDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Admins', async () => {
    await navBarPage.goToEntity('admin');
    adminComponentsPage = new AdminComponentsPage();
    await browser.wait(ec.visibilityOf(adminComponentsPage.title), 5000);
    expect(await adminComponentsPage.getTitle()).to.eq('gestFactureProjectApp.admin.home.title');
    await browser.wait(ec.or(ec.visibilityOf(adminComponentsPage.entities), ec.visibilityOf(adminComponentsPage.noResult)), 1000);
  });

  it('should load create Admin page', async () => {
    await adminComponentsPage.clickOnCreateButton();
    adminUpdatePage = new AdminUpdatePage();
    expect(await adminUpdatePage.getPageTitle()).to.eq('gestFactureProjectApp.admin.home.createOrEditLabel');
    await adminUpdatePage.cancel();
  });

  it('should create and save Admins', async () => {
    const nbButtonsBeforeCreate = await adminComponentsPage.countDeleteButtons();

    await adminComponentsPage.clickOnCreateButton();

    await promise.all([
      adminUpdatePage.setNomInput('nom'),
      adminUpdatePage.setPrenomInput('prenom'),
      adminUpdatePage.setLoginInput('login'),
      adminUpdatePage.setPasswordInput('password'),
    ]);

    expect(await adminUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await adminUpdatePage.getPrenomInput()).to.eq('prenom', 'Expected Prenom value to be equals to prenom');
    expect(await adminUpdatePage.getLoginInput()).to.eq('login', 'Expected Login value to be equals to login');
    expect(await adminUpdatePage.getPasswordInput()).to.eq('password', 'Expected Password value to be equals to password');

    await adminUpdatePage.save();
    expect(await adminUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await adminComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Admin', async () => {
    const nbButtonsBeforeDelete = await adminComponentsPage.countDeleteButtons();
    await adminComponentsPage.clickOnLastDeleteButton();

    adminDeleteDialog = new AdminDeleteDialog();
    expect(await adminDeleteDialog.getDialogTitle()).to.eq('gestFactureProjectApp.admin.delete.question');
    await adminDeleteDialog.clickOnConfirmButton();

    expect(await adminComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
