import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFacture } from 'app/shared/model/facture.model';
import { FactureService } from './facture.service';
import { FactureDeleteDialogComponent } from './facture-delete-dialog.component';

@Component({
  selector: 'jhi-facture',
  templateUrl: './facture.component.html',
})
export class FactureComponent implements OnInit, OnDestroy {
  factures?: IFacture[];
  eventSubscriber?: Subscription;

  constructor(protected factureService: FactureService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.factureService.query().subscribe((res: HttpResponse<IFacture[]>) => (this.factures = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFactures();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFacture): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFactures(): void {
    this.eventSubscriber = this.eventManager.subscribe('factureListModification', () => this.loadAll());
  }

  delete(facture: IFacture): void {
    const modalRef = this.modalService.open(FactureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.facture = facture;
  }
}
