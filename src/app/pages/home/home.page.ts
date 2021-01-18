import { Component, OnInit } from '@angular/core';
import { BicicletaBll } from 'src/app/bll/BicicletaBll';
import { BicicletaService } from '../../services/bicicleta.service';
import { BicicletaModelo } from 'src/app/models/Bicicleta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  listaBicicletas: any[];

  objBicicletaBll: BicicletaBll = new BicicletaBll();

  objBicicletaDetalle: BicicletaModelo = {
    Estado: false,
    Descripcion: '',
    Id: 0,
    Latitud: 0,
    Longitud: 0,
    Marca: ''
  };

  constructor(private dbServices: BicicletaService, private route: ActivatedRoute) {
  }
  async ngOnInit() {
    this.route.params.subscribe(data => {
      this.cargarListaBicicletas();
    });
  }
  async cargarListaBicicletas() {
    this.objBicicletaDetalle.Estado=false;
    await this.objBicicletaBll.list(this.dbServices)
      .then((res) => {
        if (res.rows.length > 0) {
          this.listaBicicletas = [];
          for (let i = 0; i < res.rows.length; i++) {
            const row = res.rows.item(i);
            this.listaBicicletas.push(row);
          }
        }
        console.log('Cargo la lista de datos');
      })
      .catch(e => {
        console.log('error al cargar la lista', e);
      });

    if (this.listaBicicletas.length > 0) {
      this.listaBicicletas.forEach(element => {
        if (element.Estado === 1) {
          this.objBicicletaDetalle.Id = element.Id;
          this.objBicicletaDetalle.Latitud = element.Latitud;
          this.objBicicletaDetalle.Longitud = element.Longitud;
          this.objBicicletaDetalle.Descripcion = element.Descripcion;
          this.objBicicletaDetalle.Estado = true;
          this.objBicicletaDetalle.Marca = element.Marca;
        }
      });
    }
  }
}
