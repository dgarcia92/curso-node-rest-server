const { Router } = require('express');
const { usuariosGet, usuariosPost, usuarioPut, usuarioDelete } = require('../controller/user');

const router = Router();

router.get('/', usuariosGet);  

router.post('/', usuariosPost);

router.put('/:id', usuarioPut); //Le pasamos el Paramtro id

router.delete('/', usuarioDelete);


module.exports = router;