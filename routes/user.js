const { Router } = require('express');
const { usuariosGet, usuariosPost, usuarioPut, usuarioDelete } = require('../controller/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeuUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);  

router.post('/', [
    check('nombre', 'El nombre no es requerido').not().isEmpty(),
    check('password', 'El password es requerido y debe de tener más de 6 letras').isLength({ min: 6 }),
    check('correo', ' El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.put('/:id', 
    [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeuUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
    ],
    usuarioPut); //Le pasamos el Paramtro id

router.delete('/:id', 
    [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeuUsuarioPorId ),
    validarCampos
    ],
    usuarioDelete);


module.exports = router;