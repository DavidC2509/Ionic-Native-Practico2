import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BicicletaModelo } from '../../models/Bicicleta';
import { BicicletaService } from '../../services/bicicleta.service';
import { BicicletaBll } from 'src/app/bll/BicicletaBll';

@Component({
  selector: 'app-lista-bicicleta-administracion',
  templateUrl: './lista-bicicleta-administracion.component.html',
  styleUrls: ['./lista-bicicleta-administracion.component.scss'],
})
export class ListaBicicletaAdministracionComponent implements OnInit {

  @Input() itemBicicleta: BicicletaModelo;
  @Output()
  propagar = new EventEmitter<boolean>();

  constructor(private dbServices: BicicletaService) { }

  ngOnInit() { }

  async eleminarBicicleta(idBicicleta: number) {
    const bicicletaBll = new BicicletaBll();
    await bicicletaBll.delete(this.dbServices, idBicicleta)
      .then(() => {
        alert('Bicicleta Eleminada correctamente');
      }).catch(e => {
        console.log('error al insertar', e);
        alert('Error en Bicicleta Eleminada');
      });
    this.propagar.emit(true);
  }
}
