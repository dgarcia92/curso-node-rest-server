const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {

        this.app = express();


        /* Config del server Socket.io con express */
        this.server = require('http').createServer( this.app); //le mando el servidor de express
        this.io = require('socket.io')( this.server );




        this.port = process.env.PORT;
        this.paths = {
            
        }

        //Middlewares
        this.middewares();

        //Rutas de mi aplicación
        this.routes();


        //Sockets
        this.sockets();
    
    }

    middewares() {
        //Cors
        this.app.use(cors());

        //Directorio Publico
        this.app.use(express.static('public'));
    }



    routes() {
            
    }



    sockets(){

      /*  this.io.on('connection', (socket) => {

             socket.on('disconnect', () => {
                //console.log('Cliente Desconectado', socket.id);
             }); 
             
             /* Eventos desde el front 

             socket.on('enviar-mensaje', ( payload,  callback) =>{  //El callback es el que se manda desde el frontend
                   
                    /* Enviar al cliente que envía la data 
                    const id = 123456; 
                    callback({ id, fecha: new Date().getTime() });

                    
                     /* Enviar a los clientes 
                     //this.io.emit('enviar-mensaje', payload);
             
              });

        }); */


        this.io.on('connection', socketController);

    }


    listen() {
        this.server.listen(this.port, () => {
            console.log('Servior corriendo en el puerto', this.port);
        });
    }


}

module.exports = Server;