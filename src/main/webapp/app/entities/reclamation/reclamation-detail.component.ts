import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReclamation } from 'app/shared/model/reclamation.model';

@Component({
  selector: 'jhi-reclamation-detail',
  templateUrl: './reclamation-detail.component.html',
})
export class ReclamationDetailComponent implements OnInit {
  reclamation: IReclamation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reclamation }) => (this.reclamation = reclamation));
  }

  previousState(): void {
    window.history.back();
  }
}
