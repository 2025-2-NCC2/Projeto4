const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config(); // Carrega variáveis do .env para desenvolvimento local

const app = express();

// --- Configurações Iniciais ---
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)){ fs.mkdirSync(uploadsDir); }

// --- Configuração de CORS (Atualizado) ---
// Lista de origens permitidas (seu site no Netlify e seu PC local)
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
// Permite que o frontend acesse os arquivos na pasta /uploads
// Ex: https://seu-backend.railway.app/uploads/nome-do-arquivo.jpg
app.use('/uploads', express.static('uploads'));

// --- Importar Rotas ---
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

// --- Montar Rotas ---
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api', dataRoutes);      // Rotas de dados da aplicação

// --- Iniciar Servidor ---
const PORT = process.env.PORT || 3001; // Correto para Railway
app.listen(PORT, () => {
  console.log(`🚀 Servidor a correr na porta: ${PORT}`);
});