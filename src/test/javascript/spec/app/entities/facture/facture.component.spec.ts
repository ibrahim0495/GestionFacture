import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestFactureProjectTestModule } from '../../../test.module';
import { FactureComponent } from 'app/entities/facture/facture.component';
import { FactureService } from 'app/entities/facture/facture.service';
import { Facture } from 'app/shared/model/facture.model';

describe('Component Tests', () => {
  describe('Facture Management Component', () => {
    let comp: FactureComponent;
    let fixture: ComponentFixture<FactureComponent>;
    let service: FactureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestFactureProjectTestModule],
        declarations: [FactureComponent],
      })
        .overrideTemplate(FactureComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FactureComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FactureService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Facture(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.factures && comp.factures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
