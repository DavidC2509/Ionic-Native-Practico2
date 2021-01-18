import { BicicletaService } from '../services/bicicleta.service';


export class BicicletaBll {

    public async list(dbService: BicicletaService) {
        if (!dbService.database) {
            await dbService.createDB();
        }
        const sqlText = 'SELECT Id,Descripcion,Latitud,Longitud,Marca,Estado FROM Bicicleta;';
        try {
            return await dbService.database.executeSql(sqlText, []);
        } catch (error) {
            console.log('error al insertar', error);
        }
    }

    public async insert(dbService: BicicletaService, Descripcion: string, Latitud: number
        , Longitud: number, Marca: string, Estado: boolean) {
        if (!dbService.database) {
            await dbService.createDB();
        }
        const sqlText = 'INSERT INTO Bicicleta(Descripcion,Latitud,Longitud,Marca,Estado) values(?,?,?,?,?)';
        try {
            return dbService.database.executeSql(sqlText, [Descripcion, Latitud, Longitud, Marca, Estado]);
        } catch (error) {
            console.log('error al insertar', error);
        }
    }

    public async actulizar(dbService: BicicletaService, idBicicleta: number, Descripcion: string, Latitud: number
        , Longitud: number, Marca: string, Estado: boolean) {
        if (!dbService.database) {
            await dbService.createDB();
        }
        const sqlText = 'UPDATE Bicicleta SET Descripcion=?,Latitud=?,Longitud=?,Marca=? WHERE Id=?';
        try {
            return dbService.database.executeSql(sqlText, [Descripcion, Latitud, Longitud, Marca, idBicicleta]);
        } catch (error) {
            console.log('error al insertar', error);
        }
    }

    public async delete(dbService: BicicletaService, Id: number) {
        if (!dbService.database) {
            await dbService.createDB();
        }
        const sqlText = 'DELETE FROM Bicicleta where Id=?';
        try {
            return dbService.database.executeSql(sqlText, [Id]);
        } catch (error) {
            console.log('error al intentar eleminar', error);
        }
    }

    public async selectId(dbService: BicicletaService, IdBicicleta: number) {
        if (!dbService.database) {
            await dbService.createDB();
        }
        const sqlText = 'SELECT Id,Descripcion,Latitud,Longitud,Marca,Estado FROM Bicicleta WHERE Id=? ;';
        try {
            return dbService.database.executeSql(sqlText, [IdBicicleta]);
        } catch (error) {
            console.log('error al Sacar la Bicicleta', error);
            alert("Error en Sacar La Bicicleta");
        }
    }

    public async rentarBicicletaId(dbService: BicicletaService, IdBicicleta: number) {
        if (!dbService.database) {
            await dbService.createDB();
        }
        const sqlText = 'UPDATE Bicicleta SET Estado=TRUE WHERE Id=? ;';
        try {
            return dbService.database.executeSql(sqlText, [IdBicicleta]);
        } catch (error) {
            console.log('error al Sacar la Bicicleta', error);
            alert("Error en Sacar La Bicicleta");
        }
    }

    public async dejarBicicleta(dbService: BicicletaService, IdBicicleta: number, Latitud: number, Longitud: number) {
        if (!dbService.database) {
            await dbService.createDB();
        }
        const sqlText = 'UPDATE Bicicleta SET Estado=FALSE,Latitud=?,Longitud=? WHERE Id=? ;';
        try {
            return dbService.database.executeSql(sqlText, [Latitud, Longitud, IdBicicleta]);
        } catch (error) {
            console.log('error al Dejar la Bicicleta', error);
            alert("Error en Dejar La Bicicleta");
        }
    }




}
