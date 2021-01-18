import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaBicicletaAdministracionComponent } from './lista-bicicleta-administracion.component';

describe('ListaBicicletaAdministracionComponent', () => {
  let component: ListaBicicletaAdministracionComponent;
  let fixture: ComponentFixture<ListaBicicletaAdministracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaBicicletaAdministracionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaBicicletaAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
