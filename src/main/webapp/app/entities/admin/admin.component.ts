import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdmin } from 'app/shared/model/admin.model';
import { AdminService } from './admin.service';
import { AdminDeleteDialogComponent } from './admin-delete-dialog.component';

@Component({
  selector: 'jhi-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit, OnDestroy {
  admins?: IAdmin[];
  eventSubscriber?: Subscription;

  constructor(protected adminService: AdminService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.adminService.query().subscribe((res: HttpResponse<IAdmin[]>) => (this.admins = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAdmins();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAdmin): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAdmins(): void {
    this.eventSubscriber = this.eventManager.subscribe('adminListModification', () => this.loadAll());
  }

  delete(admin: IAdmin): void {
    const modalRef = this.modalService.open(AdminDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.admin = admin;
  }
}
