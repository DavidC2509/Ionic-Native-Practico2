import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioCreacionBicicletaPage } from './formulario-creacion-bicicleta.page';

describe('FormularioCreacionBicicletaPage', () => {
  let component: FormularioCreacionBicicletaPage;
  let fixture: ComponentFixture<FormularioCreacionBicicletaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCreacionBicicletaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioCreacionBicicletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
