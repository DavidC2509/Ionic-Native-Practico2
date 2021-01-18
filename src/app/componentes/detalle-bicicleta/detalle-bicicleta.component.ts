import { Component, OnInit, Input } from '@angular/core';
import { BicicletaModelo } from '../../models/Bicicleta';
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
  MarkerCluster,
  ILatLng
} from '@ionic-native/google-maps';
import { BicicletaBll } from 'src/app/bll/BicicletaBll';
import { BicicletaService } from 'src/app/services/bicicleta.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-detalle-bicicleta',
  templateUrl: './detalle-bicicleta.component.html',
  styleUrls: ['./detalle-bicicleta.component.scss'],
})
export class DetalleBicicletaComponent implements OnInit {

  @Input() objBicicletaDetalle: BicicletaModelo;
  map: GoogleMap;

  LatitudNuevaUbicacion: number = 0;
  LongitudNuevaUbicacion: number = 0;
  marker: any;

  latitud: number = 0;
  longitud: number = 0;

  objBicicletaBll: BicicletaBll = new BicicletaBll();


  constructor(private dbService: BicicletaService, private router: Router, private platform: Platform) { }

  async ngOnInit() {
    this.platform.ready();
    if (this.objBicicletaDetalle.Latitud != 0 || this.objBicicletaDetalle.Longitud != 0) {
      await this.loadMap();
    }
  }
  loadMap() {
    alert('Entro a la posicicion de loa bicicleta');
    // This code is necessary for browser
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.objBicicletaDetalle.Latitud,
          lng: this.objBicicletaDetalle.Longitud
        },
        zoom: 17,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas3', mapOptions);

    const marcadorBicicletaAntigua: Marker = this.map.addMarkerSync({
      title: 'Ubicacion de la Bicicleta',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.objBicicletaDetalle.Latitud,
        lng: this.objBicicletaDetalle.Longitud
      }
    });

    marcadorBicicletaAntigua.on(GoogleMapsEvent.MARKER_CLICK).subscribe((e) => {
      alert(marcadorBicicletaAntigua.getTitle());
    });

    //  Codigo Marcador que no entiendo nada pero funciona no tocar
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
          this.LatitudNuevaUbicacion = e[0].lat;
          this.LongitudNuevaUbicacion = e[0].lng;
          if (this.marker == undefined) {
            this.map.addMarker({
              title: 'Bicicleta',
              icon: 'red',
              map: this.map,
              animation: 'DROP',
              position: {
                lat: this.LatitudNuevaUbicacion,
                lng: this.LongitudNuevaUbicacion
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

  async dejarBicicleta() {
    // tslint:disable-next-line: max-line-length
    await this.objBicicletaBll.dejarBicicleta(this.dbService, this.objBicicletaDetalle.Id, this.LatitudNuevaUbicacion, this.LongitudNuevaUbicacion)
      .then(() => {
        alert('Bicicleta Dejada correctamente');
        this.router.navigate(['/home']);
      }).catch(e => {
        console.log('error al insertar', e);
      });

  }

}
