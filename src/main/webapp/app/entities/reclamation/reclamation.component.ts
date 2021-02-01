import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReclamation } from 'app/shared/model/reclamation.model';
import { ReclamationService } from './reclamation.service';
import { ReclamationDeleteDialogComponent } from './reclamation-delete-dialog.component';

@Component({
  selector: 'jhi-reclamation',
  templateUrl: './reclamation.component.html',
})
export class ReclamationComponent implements OnInit, OnDestroy {
  reclamations?: IReclamation[];
  eventSubscriber?: Subscription;

  constructor(
    protected reclamationService: ReclamationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.reclamationService.query().subscribe((res: HttpResponse<IReclamation[]>) => (this.reclamations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInReclamations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReclamation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReclamations(): void {
    this.eventSubscriber = this.eventManager.subscribe('reclamationListModification', () => this.loadAll());
  }

  delete(reclamation: IReclamation): void {
    const modalRef = this.modalService.open(ReclamationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reclamation = reclamation;
  }
}
