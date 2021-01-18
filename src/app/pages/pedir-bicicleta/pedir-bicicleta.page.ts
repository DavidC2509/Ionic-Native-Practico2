import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BicicletaBll } from 'src/app/bll/BicicletaBll';
import { BicicletaService } from '../../services/bicicleta.service';

@Component({
  selector: 'app-pedir-bicicleta',
  templateUrl: './pedir-bicicleta.page.html',
  styleUrls: ['./pedir-bicicleta.page.scss'],
})
export class PedirBicicletaPage implements OnInit {

  idBicicleta: number = 0;
  objBicicletaBll: BicicletaBll = new BicicletaBll();

  constructor(private router: Router, private route: ActivatedRoute, private dbService: BicicletaService) { }

  objBicicleta = {
    Descripcion: '',
    Latitud: 0,
    Longitud: 0,
    Marca: '',
    Estado: false
  };
  async ngOnInit() {
    await this.route.params.subscribe(data => {
      if (data.number) {
        this.idBicicleta = data.number;
      }
    });
    if (this.idBicicleta === 0) {

    } else {
      this.selectIdBicicleta();
    }
  }

  async selectIdBicicleta() {
    await this.objBicicletaBll.selectId(this.dbService, this.idBicicleta)
      .then((res) => {
        this.objBicicleta.Descripcion = res.rows.item(0).Descripcion;
        this.objBicicleta.Latitud = res.rows.item(0).Latitud;
        this.objBicicleta.Longitud = res.rows.item(0).Longitud;
        this.objBicicleta.Marca = res.rows.item(0).Marca;
        this.objBicicleta.Estado = res.rows.item(0).Estado;
        console.log('Cargo la Bicicleta');
      })
      .catch(e => {
        alert('error al cargar la lista');
        console.log('error al cargar la lista', e);
      });
  }

  async rentarBicicleta() {
    await this.objBicicletaBll.rentarBicicletaId(this.dbService, this.idBicicleta)
      .then(() => {
        alert('Bicicleta Rentada correctamente');
        this.router.navigate(['/home']);
      }).catch(e => {
        console.log('error al insertar', e);
      });
  }

}
