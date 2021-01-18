import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AbmBicicletasPage } from './abm-bicicletas.page';

describe('AbmBicicletasPage', () => {
  let component: AbmBicicletasPage;
  let fixture: ComponentFixture<AbmBicicletasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmBicicletasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AbmBicicletasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
