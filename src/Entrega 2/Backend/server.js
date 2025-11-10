const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config(); // Carrega variáveis do .env para desenvolvimento local

const app = express();

// --- Configurações Iniciais ---
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)){ fs.mkdirSync(uploadsDir); }

// --- Configuração de CORS ---
// Esta configuração está perfeita e já inclui seu site Netlify.
const allowedOrigins = [
  'https://empatech2.netlify.app', // Sua URL de produção
  'http://localhost:5173'           // Sua URL de desenvolvimento
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (ex: Postman) ou se a origem estiver na lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware para parsear JSON

// --- Servir Arquivos Estáticos ---
// IMPORTANTE: O Render tem um "sistema de arquivos efêmero".
// Isso significa que qualquer arquivo salvo na pasta /uploads será APAGADO
// sempre que o servidor reiniciar. Esta linha está correta, mas
// a solução de longo prazo é usar um serviço como o Amazon S3.
app.use('/uploads', express.static('uploads'));

// --- Importar Rotas ---
// Estas rotas não mudam. O Express não se importa
// se o controller está usando MySQL ou PostgreSQL.
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

// --- Montar Rotas ---
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api', dataRoutes);      // Rotas de dados da aplicação

// --- Iniciar Servidor ---
// Esta linha é 100% compatível com o Render.
const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`🚀 Servidor a correr na porta: ${PORT}`);
});