const { response, request, query } = require('express');
const Usuario = require ('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = (req = request, res = response) => {

    //Query params =  url?nombre=David&key=12345&page=1

    const {nombre, key, page = 1 } = req.query;

    res.json({ 
        msg :'Get api - Controlador',
        nombre,
        key,
        page
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol} );
    
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail){
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();


    res.status(201).json({ 
        usuario
    });
}

const usuarioPut = (req, res) => {
    
    const id = req.params.id;
    
    res.json({ 
        msg :'Put api - Contr oller',
        id
    });
}

const usuarioDelete = (req, res) => {
    res.json({ msg :'Delete api - Controller'});
}



module.exports = 
{
    usuariosGet,
    usuariosPost,
    usuarioPut,
    usuarioDelete
}