const mysql = require('mysql2');
require('dotenv').config();

// --- Ligação à Base de Dados ---
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306
});

db.connect(err => {
    if (err) {
        console.error('❌ ERRO ao conectar ao MySQL:', err);
        return;
    }
    console.log('✅ Backend conectado ao MySQL com sucesso!');
});

module.exports = db;

