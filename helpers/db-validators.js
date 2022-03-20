const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if(!existRol){
        throw new Error('El rol no está registrado en la DB');
    }
};


const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail){
        throw new Error(`El correo ${correo} ya está registrado`);
    }
};


const existeuUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error(`El id ${id} no existe`);
    }
};


module.exports = 
{
    esRolValido,
    emailExiste,
    existeuUsuarioPorId
}