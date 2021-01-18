import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedirBicicletaPage } from './pedir-bicicleta.page';

describe('PedirBicicletaPage', () => {
  let component: PedirBicicletaPage;
  let fixture: ComponentFixture<PedirBicicletaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirBicicletaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedirBicicletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
