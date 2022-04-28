//Referencias del HTML

const lbl_on = document.querySelector("#lbl_on");
const lbl_off = document.querySelector("#lbl_off");

const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");


const socket = io();

socket.on('connect', () => {
    lbl_off.style.display = 'none';
    lbl_on.style.display = '';
});

socket.on('disconnect', () => {
    lbl_off.style.display = '';
    lbl_on.style.display = 'none';
});



/* Enviar mensaje al servidor  */
btnEnviar.addEventListener('click', () =>{

    const mensaje = txtMensaje.value;

    const payload = {
        mensaje,
        id : '123ABC',
        fecha: new Date().getTime(),
        token: "Bcd#DRz.SD#32323ssdDE"
    }

    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log(' Desde el server ', id)
    });
});


socket.on('enviar-mensaje', ( payload ) => {
    console.log( payload  );
});