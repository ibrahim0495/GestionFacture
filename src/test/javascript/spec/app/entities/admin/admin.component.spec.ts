import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestFactureProjectTestModule } from '../../../test.module';
import { AdminComponent } from 'app/entities/admin/admin.component';
import { AdminService } from 'app/entities/admin/admin.service';
import { Admin } from 'app/shared/model/admin.model';

describe('Component Tests', () => {
  describe('Admin Management Component', () => {
    let comp: AdminComponent;
    let fixture: ComponentFixture<AdminComponent>;
    let service: AdminService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestFactureProjectTestModule],
        declarations: [AdminComponent],
      })
        .overrideTemplate(AdminComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdminComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdminService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Admin(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.admins && comp.admins[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
