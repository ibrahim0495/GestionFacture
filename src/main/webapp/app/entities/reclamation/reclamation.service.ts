import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReclamation } from 'app/shared/model/reclamation.model';

type EntityResponseType = HttpResponse<IReclamation>;
type EntityArrayResponseType = HttpResponse<IReclamation[]>;

@Injectable({ providedIn: 'root' })
export class ReclamationService {
  public resourceUrl = SERVER_API_URL + 'api/reclamations';

  constructor(protected http: HttpClient) {}

  create(reclamation: IReclamation): Observable<EntityResponseType> {
    return this.http.post<IReclamation>(this.resourceUrl, reclamation, { observe: 'response' });
  }

  update(reclamation: IReclamation): Observable<EntityResponseType> {
    return this.http.put<IReclamation>(this.resourceUrl, reclamation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReclamation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReclamation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
