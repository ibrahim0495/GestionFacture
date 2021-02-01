import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestFactureProjectTestModule } from '../../../test.module';
import { ReclamationDetailComponent } from 'app/entities/reclamation/reclamation-detail.component';
import { Reclamation } from 'app/shared/model/reclamation.model';

describe('Component Tests', () => {
  describe('Reclamation Management Detail Component', () => {
    let comp: ReclamationDetailComponent;
    let fixture: ComponentFixture<ReclamationDetailComponent>;
    const route = ({ data: of({ reclamation: new Reclamation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestFactureProjectTestModule],
        declarations: [ReclamationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ReclamationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReclamationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load reclamation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reclamation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
