// 1. Importamos o 'pg' (PostgreSQL) em vez do 'mysql2'
const { Pool } = require('pg');

// 2. Carregamos as variáveis de ambiente (para desenvolvimento local)
require('dotenv').config();

// 3. O driver 'pg' é inteligente. Ele procura automaticamente
//    a variável 'DATABASE_URL'. O Render nos dá essa variável
//    automaticamente na produção.
const connectionString = process.env.DATABASE_URL;

// 4. Criamos um 'Pool' de conexões. É o equivalente
//    ao 'createPool' do MySQL e é muito mais eficiente.
const pool = new Pool({
  connectionString: connectionString,
  // 5. O Render exige conexões SSL. Esta linha é obrigatória.
  //    (Mas a desativa localmente se a DATABASE_URL não estiver definida)
  ssl: connectionString ? { rejectUnauthorized: false } : false
});

// 6. Teste de conexão (Opcional, mas recomendado)
//    Tentamos pegar um cliente do pool para ver se a conexão funciona.
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ ERRO ao conectar ao PostgreSQL:', err.stack);
  }
  client.release(); // Libera o cliente de volta para o pool
  console.log('✅ Backend conectado ao PostgreSQL com sucesso!');
});

// 7. Exportamos o 'pool' no formato CommonJS.
//    Seus controllers (authController, dataController) agora usarão
//    'db.query()' da mesma forma que antes, mas será o pool do 'pg'.
module.exports = pool;