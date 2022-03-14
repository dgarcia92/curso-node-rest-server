const { Router } = require('express');
const { usuariosGet, usuariosPost, usuarioPut, usuarioDelete } = require('../controller/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');

const router = Router();

router.get('/', usuariosGet);  

router.post('/', [
    check('nombre', 'El nombre no es requerido').not().isEmpty(),
    check('password', 'El password es requerido y debe de tener más de 6 letras').isLength({ min: 6 }),
    check('correo', ' El correo no es válido').isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( async(rol = '') => {
        const existRol = await Role.findOne({ rol });
        if(!existRol){
            throw new Error('El rol no está registrado en la DB');
        }
    }),
    validarCampos
], usuariosPost);

router.put('/:id', usuarioPut); //Le pasamos el Paramtro id

router.delete('/', usuarioDelete);


module.exports = router;