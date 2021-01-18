import { Component, OnInit } from '@angular/core';
import { BicicletaService } from '../../services/bicicleta.service';
import { BicicletaBll } from '../../bll/BicicletaBll';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-abm-bicicletas',
  templateUrl: './abm-bicicletas.page.html',
  styleUrls: ['./abm-bicicletas.page.scss'],
})
export class AbmBicicletasPage implements OnInit {

  listaBicicletas: any[];
  objBicicletaBll: BicicletaBll = new BicicletaBll();

  constructor(private dbServices: BicicletaService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.params.subscribe(data => {
      this.cargarListaBicicletas();
    });
  }
  async cargarListaBicicletas() {
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
        alert('error al cargar la lista');
      });
  }
  procesaPropagar(operador) {
    if (operador == true) {
      this.cargarListaBicicletas();
    }
  }

}
