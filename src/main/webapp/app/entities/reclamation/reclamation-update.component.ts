import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IReclamation, Reclamation } from 'app/shared/model/reclamation.model';
import { ReclamationService } from './reclamation.service';
import { IFacture } from 'app/shared/model/facture.model';
import { FactureService } from 'app/entities/facture/facture.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IFacture | IUser;

@Component({
  selector: 'jhi-reclamation-update',
  templateUrl: './reclamation-update.component.html',
})
export class ReclamationUpdateComponent implements OnInit {
  isSaving = false;
  factures: IFacture[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    objet: [],
    libelle: [],
    facture: [],
    user: [],
  });

  constructor(
    protected reclamationService: ReclamationService,
    protected factureService: FactureService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reclamation }) => {
      this.updateForm(reclamation);

      this.factureService.query().subscribe((res: HttpResponse<IFacture[]>) => (this.factures = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(reclamation: IReclamation): void {
    this.editForm.patchValue({
      id: reclamation.id,
      objet: reclamation.objet,
      libelle: reclamation.libelle,
      facture: reclamation.facture,
      user: reclamation.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reclamation = this.createFromForm();
    if (reclamation.id !== undefined) {
      this.subscribeToSaveResponse(this.reclamationService.update(reclamation));
    } else {
      this.subscribeToSaveResponse(this.reclamationService.create(reclamation));
    }
  }

  private createFromForm(): IReclamation {
    return {
      ...new Reclamation(),
      id: this.editForm.get(['id'])!.value,
      objet: this.editForm.get(['objet'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      facture: this.editForm.get(['facture'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReclamation>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
