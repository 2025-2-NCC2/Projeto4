const express = require('express');
const router = express.Router();
const { loginGestor, loginGrupo, registerGestor, registerGrupo } = require('../controllers/authController');

// --- Rotas Públicas ---
// Estas rotas são usadas para login e registo, por isso não precisam de autenticação.

// Rota para o login de um gestor
router.post('/login/gestor', loginGestor);

// Rota para o login de um grupo
router.post('/login/grupo', loginGrupo);

// Rota para o registo de um novo gestor
router.post('/register/gestor', registerGestor);

// Rota para o registo de um novo grupo
router.post('/register/grupo', registerGrupo);

module.exports = router;

