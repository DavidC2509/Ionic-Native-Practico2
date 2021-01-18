import { Component, OnInit, Input } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
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
  MarkerCluster
} from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { BicicletaModelo } from 'src/app/models/Bicicleta';
import { MarcadoresBicicleta } from '../../models/MarcadoresBicicleta';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {


  @Input() listaBicicletas: BicicletaModelo[];

  latitud: number = 0;
  longitud: number = 0;
  total: string;

  marcadoresBicicleta: MarcadoresBicicleta[] = [];
  marcadorDescripcion: any;

  map: GoogleMap;
  constructor(private router: Router, private platform: Platform, private geolocation: Geolocation, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.route.params.subscribe(data => {
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
    // This code is necessary for browse
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitud,
          lng: this.longitud
        },
        zoom: 17,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    const marcadorUsuario: Marker = this.map.addMarkerSync({
      title: 'Ubicacion',
      icon: 'blue',
      animation: 'DROP',
      snippet: "1",
      position: {
        lat: this.latitud,
        lng: this.longitud
      }
    });

    this.addCluster(this.extraertDatos());

    marcadorUsuario.on(GoogleMapsEvent.MARKER_CLICK).subscribe((e) => {
      alert(marcadorUsuario.getTitle());
      this.total = marcadorUsuario.getTitle();
    });

  }
  extraertDatos() {
    if (this.listaBicicletas != null) {
      for (const itemBicicleta of this.listaBicicletas) {
        const data: MarcadoresBicicleta = {
          position: {
            lat: itemBicicleta.Latitud,
            lng: itemBicicleta.Longitud
          },
          title: '' + itemBicicleta.Id
        };
        this.marcadoresBicicleta.push(data);
      }
    }

    return this.marcadoresBicicleta;
  }
  
  addCluster(data) {
    const markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
      markers: data,
      icons: [
        {
          min: 3,
          max: 9,
          url: "./assets/markercluster/small.png",
          label: {
            color: "white"
          }
        },
        {
          min: 10,
          url: "./assets/markercluster/large.png",
          label: {
            color: "white"
          }
        }
      ]
    });
    markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
      const marker: Marker = params[1];
      alert("Usted Escogio la Bicicleta " + marker.get("title"));
      marker.setTitle(marker.get("title"));
      this.router.navigate(['/pedir-bicicleta/' + marker.get('title')]);
      marker.showInfoWindow();
    });

  }

}
