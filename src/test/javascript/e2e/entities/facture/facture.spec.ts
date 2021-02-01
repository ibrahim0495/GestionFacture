import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FactureComponentsPage, FactureDeleteDialog, FactureUpdatePage } from './facture.page-object';

const expect = chai.expect;

describe('Facture e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let factureComponentsPage: FactureComponentsPage;
  let factureUpdatePage: FactureUpdatePage;
  let factureDeleteDialog: FactureDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Factures', async () => {
    await navBarPage.goToEntity('facture');
    factureComponentsPage = new FactureComponentsPage();
    await browser.wait(ec.visibilityOf(factureComponentsPage.title), 5000);
    expect(await factureComponentsPage.getTitle()).to.eq('gestFactureProjectApp.facture.home.title');
    await browser.wait(ec.or(ec.visibilityOf(factureComponentsPage.entities), ec.visibilityOf(factureComponentsPage.noResult)), 1000);
  });

  it('should load create Facture page', async () => {
    await factureComponentsPage.clickOnCreateButton();
    factureUpdatePage = new FactureUpdatePage();
    expect(await factureUpdatePage.getPageTitle()).to.eq('gestFactureProjectApp.facture.home.createOrEditLabel');
    await factureUpdatePage.cancel();
  });

  it('should create and save Factures', async () => {
    const nbButtonsBeforeCreate = await factureComponentsPage.countDeleteButtons();

    await factureComponentsPage.clickOnCreateButton();

    await promise.all([
      factureUpdatePage.setNumeroInput('5'),
      factureUpdatePage.setDateDelivranceInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      factureUpdatePage.setDateLimitePaiementInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      factureUpdatePage.setConsommationInput('consommation'),
      factureUpdatePage.setEtatInput('etat'),
      factureUpdatePage.typeFactureSelectLastOption(),
      factureUpdatePage.clientSelectLastOption(),
    ]);

    expect(await factureUpdatePage.getNumeroInput()).to.eq('5', 'Expected numero value to be equals to 5');
    expect(await factureUpdatePage.getDateDelivranceInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDelivrance value to be equals to 2000-12-31'
    );
    expect(await factureUpdatePage.getDateLimitePaiementInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateLimitePaiement value to be equals to 2000-12-31'
    );
    expect(await factureUpdatePage.getConsommationInput()).to.eq(
      'consommation',
      'Expected Consommation value to be equals to consommation'
    );
    expect(await factureUpdatePage.getEtatInput()).to.eq('etat', 'Expected Etat value to be equals to etat');

    await factureUpdatePage.save();
    expect(await factureUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await factureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Facture', async () => {
    const nbButtonsBeforeDelete = await factureComponentsPage.countDeleteButtons();
    await factureComponentsPage.clickOnLastDeleteButton();

    factureDeleteDialog = new FactureDeleteDialog();
    expect(await factureDeleteDialog.getDialogTitle()).to.eq('gestFactureProjectApp.facture.delete.question');
    await factureDeleteDialog.clickOnConfirmButton();

    expect(await factureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
