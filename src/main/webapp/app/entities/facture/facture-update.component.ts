import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFacture, Facture } from 'app/shared/model/facture.model';
import { FactureService } from './facture.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';

@Component({
  selector: 'jhi-facture-update',
  templateUrl: './facture-update.component.html',
})
export class FactureUpdateComponent implements OnInit {
  isSaving = false;
  clients: IClient[] = [];

  editForm = this.fb.group({
    id: [],
    numero: [null, [Validators.required]],
    dateDelivrance: [],
    dateLimitePaiement: [],
    consommation: [],
    etat: [],
    typeFacture: [],
    client: [],
  });

  constructor(
    protected factureService: FactureService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facture }) => {
      if (!facture.id) {
        const today = moment().startOf('day');
        facture.dateDelivrance = today;
        facture.dateLimitePaiement = today;
      }

      this.updateForm(facture);

      this.clientService.query().subscribe((res: HttpResponse<IClient[]>) => (this.clients = res.body || []));
    });
  }

  updateForm(facture: IFacture): void {
    this.editForm.patchValue({
      id: facture.id,
      numero: facture.numero,
      dateDelivrance: facture.dateDelivrance ? facture.dateDelivrance.format(DATE_TIME_FORMAT) : null,
      dateLimitePaiement: facture.dateLimitePaiement ? facture.dateLimitePaiement.format(DATE_TIME_FORMAT) : null,
      consommation: facture.consommation,
      etat: facture.etat,
      typeFacture: facture.typeFacture,
      client: facture.client,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facture = this.createFromForm();
    if (facture.id !== undefined) {
      this.subscribeToSaveResponse(this.factureService.update(facture));
    } else {
      this.subscribeToSaveResponse(this.factureService.create(facture));
    }
  }

  private createFromForm(): IFacture {
    return {
      ...new Facture(),
      id: this.editForm.get(['id'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      dateDelivrance: this.editForm.get(['dateDelivrance'])!.value
        ? moment(this.editForm.get(['dateDelivrance'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateLimitePaiement: this.editForm.get(['dateLimitePaiement'])!.value
        ? moment(this.editForm.get(['dateLimitePaiement'])!.value, DATE_TIME_FORMAT)
        : undefined,
      consommation: this.editForm.get(['consommation'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      typeFacture: this.editForm.get(['typeFacture'])!.value,
      client: this.editForm.get(['client'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacture>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IClient): any {
    return item.id;
  }
}
