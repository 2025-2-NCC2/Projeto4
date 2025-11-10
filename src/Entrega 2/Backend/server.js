const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();

// --- Configurações Iniciais ---
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)){ fs.mkdirSync(uploadsDir); }

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// --- Importar Rotas ---
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

// --- Montar Rotas ---
app.use('/api/auth', authRoutes); // Rotas públicas de autenticação
app.use('/api', dataRoutes);     // Rotas protegidas para os dados da aplicação

// --- Iniciar Servidor ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor modularizado a correr na porta: ${PORT}`);
});
