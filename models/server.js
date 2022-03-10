const express = require('express');
var cors = require('cors')

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.userRoutePath = '/api/users';

        //Middlewares
        this.middewares();

        //Rutas de mi aplicación
        this.routes();
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