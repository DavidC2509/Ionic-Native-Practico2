import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BicicletaService {

  public database: SQLiteObject;
  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.createDB();
    });
  }
  async createDB() {
    await this.sqlite.create({ name: 'bicicleta.db', location: 'default' })
      .then((db: SQLiteObject) => {
        this.database = db;
      }, (error) => {
        console.log('Error al crear la db', error);
      });
    console.log('creo correctamente');
    this.createTables();
  }
  async createTables() {
    try {
      await this.database.executeSql('CREATE TABLE IF NOT EXISTS Bicicleta(Id INTEGER PRIMARY KEY AUTOINCREMENT, Descripcion TEXT, Latitud DOUBLE, Longitud DOUBLE, Marca TEXT, Estado BOOLEAN)');
    } catch (e) {
      console.log('Error al crear la base');
    }
  }
}
