

const socketController = (socket) => {

    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
       console.log('Cliente Desconectado', socket.id);
    }); 
    


    /* Eventos desde el front */
    socket.on('enviar-mensaje', ( payload,  callback) =>{  //El callback es el que se manda desde el frontend
          
        /* Enviar al cliente que envía la data */
        const id = 123456; 
        callback({ id, fecha: new Date().getTime() });

           
        /* Enviar a los clientes */
        socket.broadcast.emit('enviar-mensaje', payload);
        //io.emit('enviar-mensaje', payload);  // otra forma
     });
}


module.exports = 
{
    socketController
}