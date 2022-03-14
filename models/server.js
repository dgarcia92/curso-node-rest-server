const express = require('express');
var cors = require('cors')

const { dbConnection } = require('../db/config')

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.userRoutePath = '/api/users';
        
        //Conectar a base de datos
        this.conectarDb();

        //Middlewares
        this.middewares();

        //Rutas de mi aplicación
        this.routes();
    }


    async conectarDb(){
            await dbConnection();
    }

    middewares() {

        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));

    }



    routes() {
        this.app.use(this.userRoutePath, require('../routes/user'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servior corriendo en el puerto', this.port);
        });
    }


}

module.exports = Server;