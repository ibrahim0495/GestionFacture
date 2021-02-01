import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestFactureProjectTestModule } from '../../../test.module';
import { ReclamationUpdateComponent } from 'app/entities/reclamation/reclamation-update.component';
import { ReclamationService } from 'app/entities/reclamation/reclamation.service';
import { Reclamation } from 'app/shared/model/reclamation.model';

describe('Component Tests', () => {
  describe('Reclamation Management Update Component', () => {
    let comp: ReclamationUpdateComponent;
    let fixture: ComponentFixture<ReclamationUpdateComponent>;
    let service: ReclamationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestFactureProjectTestModule],
        declarations: [ReclamationUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ReclamationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReclamationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReclamationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Reclamation(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Reclamation();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
