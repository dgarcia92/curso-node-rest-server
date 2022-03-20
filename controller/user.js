const { response, request, query } = require('express');
const Usuario = require ('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {

    let { limite = 5, desde = 0 } = req.query;

    limite = isNaN(limite) ? 5 : limite;
    desde = isNaN(desde) ? 0 : desde;

    const query = { estado: true};

   /* const usuarios = await Usuario.find( query)   //solo filtra usuarios que esten activos
        .limit(Number( limite ))
        .skip(Number( desde )); */

   // const total = await Usuario.countDocuments( query );


    //usamos promise All para que se ejecuten las dos consultas de manera Asincrona
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query)   //solo filtra usuarios que esten activos
        .limit(Number( limite ))
        .skip(Number( desde ))
    ]);


    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol} );
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();


    res.status(201).json({ 
        usuario
    });
}

const usuarioPut = async(req, res) => {
    
    const { id } = req.params;
    const { _id, password, google, correo, ...restoInfo} = req.body
    
    //TODO Validar contra base de datos
    if( password ){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        restoInfo.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, restoInfo);

    res.json(usuario);
}

const usuarioDelete = async (req, res) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete( id );

    //Cambiamos el estado del usuario

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json( usuario );
}



module.exports = 
{
    usuariosGet,
    usuariosPost,
    usuarioPut,
    usuarioDelete
}