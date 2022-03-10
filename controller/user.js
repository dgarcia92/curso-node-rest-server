const { response, request, query } = require('express');

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

const usuariosPost = (req, res = response) => {

    const { name, apellido} = req.body;

    res.status(201).json({ 
        msg :'Post api - Controlador',
        name,
        apellido
    });
}

const usuarioPut = (req, res) => {
    
    const id = req.params.id;
    
    res.json({ 
        msg :'Put api - Controller',
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