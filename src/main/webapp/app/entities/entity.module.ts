import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.GestFactureProjectClientModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.GestFactureProjectAdminModule),
      },
      {
        path: 'facture',
        loadChildren: () => import('./facture/facture.module').then(m => m.GestFactureProjectFactureModule),
      },
      {
        path: 'reclamation',
        loadChildren: () => import('./reclamation/reclamation.module').then(m => m.GestFactureProjectReclamationModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GestFactureProjectEntityModule {}
