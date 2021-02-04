import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
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
