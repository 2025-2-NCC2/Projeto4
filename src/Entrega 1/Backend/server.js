const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
// Carrega as variáveis de ambiente do ficheiro .env em desenvolvimento
require('dotenv').config();

const app = express();

// --- Configuração de CORS Definitiva e Robusta ---
const allowedOrigins = [
    'https://glittering-cranachan-8f8a09.netlify.app',
    'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  optionsSuccessStatus: 200
};

console.log("--- CONFIGURAÇÃO DE CORS ATIVADA ---");
console.log("Origens permitidas:", allowedOrigins);

app.use(cors(corsOptions));
app.use(express.json());

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

// --- ROTA DE TESTE DE SAÚDE ---
// Permite-nos verificar se o servidor está online e a responder.
app.get('/', (req, res) => {
    res.status(200).send('API EmpáTech está online e a funcionar!');
});


// --- ROTAS DA API ---

app.get('/api/equipes', (req, res) => {
    const sql = `
        SELECT 
            e.equipe_id, e.nome, e.mentorNome, e.mentorRa, e.mentorEmail, e.mentorTelefone,
            COALESCE(e.valor, 0) AS valor, COALESCE(e.alimentos, 0) AS alimentos
        FROM Equipes e
    `;
    db.query(sql, (err, data) => {
        if (err) { console.error("❌ Erro ao buscar equipes:", err); return res.status(500).json({ error: "Erro ao buscar equipes." }); }
        return res.json(data);
    });
});

app.get('/api/alunos', (req, res) => { 
    const sql = `SELECT a.aluno_id, a.nome, a.ra, a.email, a.telefone, e.nome AS equipe FROM Alunos a JOIN Equipes e ON a.equipe_id = e.equipe_id;`; 
    db.query(sql, (err, data) => { 
        if (err) return res.status(500).json({ error: "Erro ao buscar alunos." }); 
        return res.json(data); 
    }); 
});

app.get('/api/familias', (req, res) => { db.query("SELECT * FROM Familias", (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar famílias." }); return res.json(data); }); });
app.get('/api/estoque', (req, res) => { const sql = `SELECT ei.nome AS item, ei.categoria, COALESCE(SUM(CASE WHEN ta.tipo = 'Entrada' THEN ta.quantidade ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN ta.tipo = 'Saida' THEN ta.quantidade ELSE 0 END), 0) AS qtd FROM Estoque_Itens ei LEFT JOIN Transacoes_Alimentos ta ON ei.item_id = ta.item_id GROUP BY ei.item_id, ei.nome, ei.categoria;`; db.query(sql, (err, data) => { if (err) return res.status(500).json({ error: "Erro ao calcular estoque." }); return res.json(data); }); });
app.get('/api/historicoDoacoes', (req, res) => { db.query("SELECT * FROM Doacoes_Dinheiro ORDER BY data DESC", (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar histórico de doações." }); return res.json(data); }); });
app.get('/api/historicoSaidas', (req, res) => { const sql = `SELECT ta.data, ei.nome as item, ta.quantidade as qtd, f.nome as destino FROM Transacoes_Alimentos ta JOIN Estoque_Itens ei ON ta.item_id = ei.item_id JOIN Familias f ON ta.familia_id = f.familia_id WHERE ta.tipo = 'Saida' ORDER BY ta.data DESC`; db.query(sql, (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar histórico de saídas." }); return res.json(data); }); });
app.get('/api/avisos', (req, res) => { db.query("SELECT * FROM Avisos ORDER BY data_publicacao DESC", (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar avisos." }); return res.json(data); }); });
app.get('/api/campanhas', (req, res) => { db.query("SELECT * FROM Campanhas ORDER BY data_termino DESC", (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar campanhas." }); return res.json(data); }); });

app.get('/api/transacoes-alimentos', (req, res) => {
    const sql = `
        SELECT 
            ta.transacao_id, ta.tipo, ta.quantidade, ta.data, ta.campanha_id,
            ei.nome AS item, e.nome AS equipe, f.nome AS destino
        FROM Transacoes_Alimentos ta
        JOIN Estoque_Itens ei ON ta.item_id = ei.item_id
        LEFT JOIN Equipes e ON ta.equipe_id = e.equipe_id
        LEFT JOIN Familias f ON ta.familia_id = f.familia_id
        ORDER BY ta.data DESC
    `;
    db.query(sql, (err, data) => {
        if (err) { console.error("❌ Erro ao buscar transações de alimentos:", err); return res.status(500).json({ error: "Erro ao buscar histórico de transações de alimentos." }); }
        res.json(data);
    });
});

app.post('/api/equipes', (req, res) => { 
    const { nome, mentorNome, mentorRa, mentorEmail, mentorTelefone } = req.body; 
    const sql = "INSERT INTO Equipes (nome, mentorNome, mentorRa, mentorEmail, mentorTelefone, valor, alimentos) VALUES (?, ?, ?, ?, ?, 0, 0)"; 
    db.query(sql, [nome, mentorNome, mentorRa, mentorEmail, mentorTelefone], (err, result) => { 
        if (err) { console.error("ERRO NO CADASTRO DE EQUIPE:", err); return res.status(500).json({ error: "Erro ao criar equipe." }); } 
        const novaEquipe = { equipe_id: result.insertId, nome, mentorNome, mentorRa, mentorEmail, mentorTelefone, valor: 0, alimentos: 0 }; 
        res.status(201).json(novaEquipe); 
    }); 
});

app.post('/api/alunos', (req, res) => { 
    const { nome, ra, email, telefone, equipe } = req.body; 
    db.query("SELECT equipe_id FROM Equipes WHERE nome = ?", [equipe], (err, results) => { 
        if (err || results.length === 0) return res.status(400).json({ error: "Equipe não encontrada." }); 
        const equipe_id = results[0].equipe_id; 
        const sql = "INSERT INTO Alunos (nome, ra, email, telefone, equipe_id) VALUES (?, ?, ?, ?, ?)"; 
        db.query(sql, [nome, ra, email, telefone, equipe_id], (err, result) => { 
            if (err) { console.error(err); return res.status(500).json({ error: "Erro ao cadastrar aluno." }); } 
            const novoAluno = { aluno_id: result.insertId, nome, ra, email, telefone, equipe }; 
            res.status(201).json(novoAluno); 
        }); 
    }); 
});

app.post('/api/familias', (req, res) => { 
    const { nome, regiao } = req.body; 
    db.query("INSERT INTO Familias (nome, regiao) VALUES (?, ?)", [nome, regiao], (err, result) => { 
        if (err) { console.error(err); return res.status(500).json({ error: "Erro ao cadastrar família." }); } 
        const novaFamilia = { familia_id: result.insertId, nome, regiao };
        res.status(201).json(novaFamilia);
    }); 
});

app.post('/api/avisos', (req, res) => { 
    const { mensagem } = req.body; 
    db.query("INSERT INTO Avisos (mensagem) VALUES (?)", [mensagem], (err, result) => { 
        if (err) { console.error(err); return res.status(500).json({ error: "Erro ao adicionar aviso." }); } 
        db.query("SELECT * FROM Avisos WHERE aviso_id = ?", [result.insertId], (selectErr, newRecord) => {
            if(selectErr) return res.status(500).json({ error: "Erro ao buscar aviso criado." });
            res.status(201).json(newRecord[0]);
        });
    }); 
});

app.post('/api/campanhas', (req, res) => { 
    const { nome, dataTermino, metaDinheiro, metaItens } = req.body; 
    const sql = "INSERT INTO Campanhas (nome, data_termino, meta_dinheiro, meta_itens) VALUES (?, ?, ?, ?)"; 
    db.query(sql, [nome, dataTermino, metaDinheiro, metaItens], (err, result) => { 
        if (err) { console.error(err); return res.status(500).json({ error: "Erro ao criar campanha." }); } 
        const novaCampanha = { campanha_id: result.insertId, nome, data_termino: dataTermino, meta_dinheiro: metaDinheiro, meta_itens: metaItens };
        res.status(201).json(novaCampanha);
    }); 
});

app.post('/api/doacoes', (req, res) => {
    const { valor, data, doador, modo, equipe, campanha_id } = req.body;
    db.query("SELECT equipe_id FROM Equipes WHERE nome = ?", [equipe], (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: "Equipe não encontrada." });
        const equipe_id = results[0].equipe_id;
        
        const sqlInsert = "INSERT INTO Doacoes_Dinheiro (valor, data, doador, modo, equipe_id, campanha_id) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sqlInsert, [valor, data, doador, modo, equipe_id, campanha_id || null], (err, result) => {
            if (err) { console.error(err); return res.status(500).json({ error: "Erro ao adicionar doação." }); }
            
            const sqlUpdate = "UPDATE Equipes SET valor = valor + ? WHERE equipe_id = ?";
            db.query(sqlUpdate, [valor, equipe_id], (updateErr) => {
                if (updateErr) { return res.status(500).json({ error: "Erro ao atualizar total da equipe." }); }
                const novaDoacao = { doacao_id: result.insertId, ...req.body };
                res.status(201).json(novaDoacao);
            });
        });
    });
});

app.post('/api/transacoes-alimentos', (req, res) => {
    const { tipo, item, qtd, equipe, destino, nomeNotaFiscal, campanha_id } = req.body;
    db.query("SELECT item_id FROM Estoque_Itens WHERE nome = ?", [item], (err, itemResults) => {
        if (err || itemResults.length === 0) return res.status(400).json({ error: "Item de estoque não encontrado." });
        const item_id = itemResults[0].item_id;

        if (tipo === 'entrada') {
            db.query("SELECT equipe_id FROM Equipes WHERE nome = ?", [equipe], (err, equipeResults) => {
                if (err || equipeResults.length === 0) return res.status(400).json({ error: "Equipe não encontrada." });
                const equipe_id = equipeResults[0].equipe_id;
                
                const sqlInsert = "INSERT INTO Transacoes_Alimentos (item_id, tipo, quantidade, equipe_id, nota_fiscal, campanha_id) VALUES (?, 'Entrada', ?, ?, ?, ?)";
                db.query(sqlInsert, [item_id, qtd, equipe_id, nomeNotaFiscal, campanha_id || null], (err, result) => {
                    if (err) { console.error(err); return res.status(500).json({ error: "Erro ao registrar entrada." }); }
                    
                    const sqlUpdate = "UPDATE Equipes SET alimentos = alimentos + ? WHERE equipe_id = ?";
                    db.query(sqlUpdate, [qtd, equipe_id], (updateErr) => {
                        if (updateErr) { return res.status(500).json({ error: "Erro ao atualizar total de alimentos da equipe." }); }
                        
                        const selectSql = `
                            SELECT ta.transacao_id, ta.tipo, ta.quantidade, ta.data, ei.nome AS item, e.nome AS equipe, ta.campanha_id
                            FROM Transacoes_Alimentos ta
                            JOIN Estoque_Itens ei ON ta.item_id = ei.item_id JOIN Equipes e ON ta.equipe_id = e.equipe_id
                            WHERE ta.transacao_id = ?`;
                        db.query(selectSql, [result.insertId], (selectErr, newRecord) => {
                            if (selectErr) return res.status(500).json({ error: "Erro ao buscar a transação." });
                            res.status(201).json(newRecord[0]);
                        });
                    });
                });
            });
        } else { // Saída
            db.query("SELECT familia_id FROM Familias WHERE nome = ?", [destino], (err, familiaResults) => {
                if (err || familiaResults.length === 0) return res.status(400).json({ error: "Família não encontrada." });
                const familia_id = familiaResults[0].familia_id;
                const sql = "INSERT INTO Transacoes_Alimentos (item_id, tipo, quantidade, familia_id) VALUES (?, 'Saida', ?, ?)";
                 db.query(sql, [item_id, qtd, familia_id], (err, result) => {
                    if (err) { return res.status(500).json({ error: "Erro ao registrar saída." }); }
                    
                    const selectSql = `
                        SELECT ta.transacao_id, ta.tipo, ta.quantidade, ta.data, ei.nome AS item, f.nome AS destino
                        FROM Transacoes_Alimentos ta
                        JOIN Estoque_Itens ei ON ta.item_id = ei.item_id JOIN Familias f ON ta.familia_id = f.familia_id
                        WHERE ta.transacao_id = ?`;
                    db.query(selectSql, [result.insertId], (selectErr, newRecord) => {
                        if (selectErr) return res.status(500).json({ error: "Erro ao buscar a transação." });
                        res.status(201).json(newRecord[0]);
                    });
                });
            });
        }
    });
});

// --- Server Listening ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend a correr na porta: ${PORT}`);
});
