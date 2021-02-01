import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReclamation } from 'app/shared/model/reclamation.model';
import { ReclamationService } from './reclamation.service';

@Component({
  templateUrl: './reclamation-delete-dialog.component.html',
})
export class ReclamationDeleteDialogComponent {
  reclamation?: IReclamation;

  constructor(
    protected reclamationService: ReclamationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reclamationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('reclamationListModification');
      this.activeModal.close();
    });
  }
}
