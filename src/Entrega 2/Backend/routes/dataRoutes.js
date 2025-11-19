const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { authenticateToken } = require('../middleware/authMiddleware');
const { 
    getPublicImpactData,
    getEquipes, updateEquipe, deleteEquipe,
    getAlunos, createAluno, updateAluno, deleteAluno,
    getFamilias, createFamilia,
    getCampanhas, createCampanha,
    getAvisos, createAviso,
    getEstoque, getHistoricoSaidas, getDoacoes, getTransacoesAlimentos,
    createTransacaoAlimento, createDoacao
} = require('../controllers/dataController');

// --- Configuração do Upload (específico para estas rotas) ---
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => cb(null, 'uploads/'), 
    filename: (req, file, cb) => { 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); 
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
    } 
});
const upload = multer({ storage: storage });

// --- ROTA PÚBLICA ---
// Esta rota não usa o 'authenticateToken' e pode ser acedida por qualquer visitante.
router.get('/public/impact', getPublicImpactData);

// --- ROTAS PROTEGIDAS ---
// Todas as rotas abaixo exigem um token JWT válido para serem acedidas.

// --- Rotas de Transações com Upload ---
router.post('/doacoes', authenticateToken, upload.single('comprovante'), createDoacao);
router.post('/transacoes-alimentos', authenticateToken, upload.single('notaFiscal'), createTransacaoAlimento);

// --- Rotas de Equipes ---
router.get('/equipes', authenticateToken, getEquipes);
router.put('/equipes/:id', authenticateToken, updateEquipe);
router.delete('/equipes/:id', authenticateToken, deleteEquipe);

// --- Rotas de Alunos ---
router.get('/alunos', authenticateToken, getAlunos);
router.post('/alunos', authenticateToken, createAluno);
router.put('/alunos/:id', authenticateToken, updateAluno);
router.delete('/alunos/:id', authenticateToken, deleteAluno);

// --- Rotas de Famílias ---
router.get('/familias', authenticateToken, getFamilias);
router.post('/familias', authenticateToken, createFamilia);

// --- Rotas de Campanhas ---
router.get('/campanhas', authenticateToken, getCampanhas);
router.post('/campanhas', authenticateToken, createCampanha);

// --- Rotas de Avisos ---
router.get('/avisos', authenticateToken, getAvisos);
router.post('/avisos', authenticateToken, createAviso);

// --- Rotas de Leitura (Views) ---
router.get('/estoque', authenticateToken, getEstoque);
router.get('/historicoSaidas', authenticateToken, getHistoricoSaidas);
router.get('/doacoes', authenticateToken, getDoacoes);
router.get('/transacoes-alimentos', authenticateToken, getTransacoesAlimentos);

module.exports = router;

