import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IReclamation, Reclamation } from 'app/shared/model/reclamation.model';
import { ReclamationService } from './reclamation.service';
import { ReclamationComponent } from './reclamation.component';
import { ReclamationDetailComponent } from './reclamation-detail.component';
import { ReclamationUpdateComponent } from './reclamation-update.component';

@Injectable({ providedIn: 'root' })
export class ReclamationResolve implements Resolve<IReclamation> {
  constructor(private service: ReclamationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReclamation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((reclamation: HttpResponse<Reclamation>) => {
          if (reclamation.body) {
            return of(reclamation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Reclamation());
  }
}

export const reclamationRoute: Routes = [
  {
    path: '',
    component: ReclamationComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gestFactureProjectApp.reclamation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReclamationDetailComponent,
    resolve: {
      reclamation: ReclamationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestFactureProjectApp.reclamation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReclamationUpdateComponent,
    resolve: {
      reclamation: ReclamationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestFactureProjectApp.reclamation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReclamationUpdateComponent,
    resolve: {
      reclamation: ReclamationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestFactureProjectApp.reclamation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
