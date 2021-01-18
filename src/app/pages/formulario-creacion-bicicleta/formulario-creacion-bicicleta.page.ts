import { Component, OnInit } from '@angular/core';
import { BicicletaService } from '../../services/bicicleta.service';
import { BicicletaBll } from 'src/app/bll/BicicletaBll';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LatLng,
  ILatLng
} from '@ionic-native/google-maps';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-formulario-creacion-bicicleta',
  templateUrl: './formulario-creacion-bicicleta.page.html',
  styleUrls: ['./formulario-creacion-bicicleta.page.scss'],
})
export class FormularioCreacionBicicletaPage implements OnInit {


  latitud: number = 0;
  longitud: number = 0;

  map: GoogleMap;

  idBicicleta: number = 0;


  marker: any;

  objBicicletaBll: BicicletaBll = new BicicletaBll();

  objBicicleta = {
    Descripcion: '',
    Latitud: 0,
    Longitud: 0,
    Marca: '',
    Estado: false
  };

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private dbService: BicicletaService, private platform: Platform, private geolocation: Geolocation) { }

  async ngOnInit() {
    this.route.params.subscribe(data => {
      if (data.number) {
        this.idBicicleta = data.number;
      }
      if (this.idBicicleta == 0) {

      } else {
        this.selectIdBicicleta();
      }
      this.platform.ready();
      this.getGeolocation();
    });

  }

  async getGeolocation() {
    await this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.latitud = geoposition.coords.latitude;
      this.longitud = geoposition.coords.longitude;
    });
    await this.loadMap();
  }

  loadMap() {

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitud,
          lng: this.longitud
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    if (this.objBicicleta.Latitud != 0 || this.objBicicleta.Longitud != 0) {
      this.map.addMarker({
        title: '' + this.idBicicleta + 'Lugar Anterior',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: this.objBicicleta.Latitud,
          lng: this.objBicicleta.Longitud
        }
      });
    } else {
      this.map.addMarker({
        title: 'Mi Ubicacion' + this.longitud,
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: this.latitud,
          lng: this.longitud
        }
      });
    }

    //  Codigo Marcador que no entiendo nada pero funciona no tocar
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
          this.objBicicleta.Latitud = e[0].lat;
          this.objBicicleta.Longitud = e[0].lng;
          if (this.marker == undefined) {
            this.map.addMarker({
              title: 'Bicicleta',
              icon: 'red',
              map: this.map,
              animation: 'DROP',
              position: {
                lat: this.objBicicleta.Latitud,
                lng: this.objBicicleta.Longitud
              }
            }).then((marker) => {
              this.marker = marker;
            });
          } else {
            let np: ILatLng = {
              lat: e[0].lat,
              lng: e[0].lng
            };
            this.marker.setPosition(np);
          }
        });
      });
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
        console.log('error al cargar la lista', e);
      });
  }
  async guardarBicicleta() {
    if (this.idBicicleta == 0) {
      this.CrearBicicleta();
    } else {
      this.ActulizarBicicleta();
    }
  }

  async ActulizarBicicleta() {
    // tslint:disable-next-line: max-line-length
    await this.objBicicletaBll.actulizar(this.dbService, this.idBicicleta, this.objBicicleta.Descripcion, this.objBicicleta.Latitud, this.objBicicleta.Longitud, this.objBicicleta.Marca, this.objBicicleta.Estado)
      .then(() => {
        alert('Bicicleta Actulizada correctamente');
        this.router.navigate(['/abm-bicicletas']);
      }).catch(e => {
        console.log('error al insertar', e);
      });
  }

  async CrearBicicleta() {
    // tslint:disable-next-line: max-line-length
    await this.objBicicletaBll.insert(this.dbService, this.objBicicleta.Descripcion, this.objBicicleta.Latitud, this.objBicicleta.Longitud, this.objBicicleta.Marca, this.objBicicleta.Estado)
      .then(() => {
        alert('Bicicleta insertada correctamente');
        this.router.navigate(['/abm-bicicletas']);
      }).catch(e => {
        console.log('error al insertar', e);
        alert('Error al crear Bicicleta');
      });
  }
}
