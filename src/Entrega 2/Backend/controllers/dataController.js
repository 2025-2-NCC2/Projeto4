const db = require('../config/db');

// --- FUNÇÕES PÚBLICAS ---
const getPublicImpactData = (req, res) => {
    const queryFamilias = "SELECT COUNT(*) as totalFamilias FROM Familias;";
    const queryItens = "SELECT SUM(CASE WHEN tipo = 'Entrada' THEN quantidade ELSE -quantidade END) as totalItens FROM Transacoes_Alimentos;";
    const queryDinheiro = "SELECT SUM(valor) as totalDinheiro FROM Doacoes_Dinheiro;";

    db.query(queryFamilias, (err, familiasRes) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar dados de impacto." });
        db.query(queryItens, (err, itensRes) => {
            if (err) return res.status(500).json({ error: "Erro ao buscar dados de impacto." });
            db.query(queryDinheiro, (err, dinheiroRes) => {
                if (err) return res.status(500).json({ error: "Erro ao buscar dados de impacto." });
                
                const data = {
                    totalFamilias: familiasRes[0].totalFamilias || 0,
                    totalItens: itensRes[0].totalItens || 0,
                    totalDinheiro: dinheiroRes[0].totalDinheiro || 0,
                };
                res.status(200).json(data);
            });
        });
    });
};


// --- CONTROLADORES PRIVADOS ---
const getEquipes = (req, res) => { db.query(`SELECT * FROM Equipes`, (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar equipes." }); return res.json(data); }); };
const updateEquipe = (req, res) => { const { id } = req.params; const { nome, mentorNome, mentorRa, mentorEmail, mentorTelefone } = req.body; const sql = `UPDATE Equipes SET nome = ?, mentorNome = ?, mentorRa = ?, mentorEmail = ?, mentorTelefone = ? WHERE equipe_id = ?`; db.query(sql, [nome, mentorNome, mentorRa, mentorEmail, mentorTelefone, id], (err, result) => { if (err) return res.status(500).json({ error: "Erro ao atualizar equipe." }); if (result.affectedRows === 0) return res.status(404).json({ error: "Equipe não encontrada." }); res.status(200).json({ message: "Equipe atualizada com sucesso." }); }); };
const deleteEquipe = (req, res) => { const { id } = req.params; db.query(`DELETE FROM Equipes WHERE equipe_id = ?`, [id], (err, result) => { if (err) return res.status(500).json({ error: "Erro ao excluir equipe." }); if (result.affectedRows === 0) return res.status(404).json({ error: "Equipe não encontrada." }); res.status(200).json({ message: "Equipe excluída com sucesso." }); }); };
const getAlunos = (req, res) => { const sql = `SELECT a.aluno_id, a.nome, a.ra, a.email, a.telefone, e.nome AS equipe FROM Alunos a JOIN Equipes e ON a.equipe_id = e.equipe_id;`; db.query(sql, (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar alunos." }); return res.json(data); }); };
const createAluno = (req, res) => { const { nome, ra, email, telefone, equipe } = req.body; db.query("SELECT equipe_id FROM Equipes WHERE nome = ?", [equipe], (err, results) => { if (err || results.length === 0) return res.status(400).json({ error: "Equipe não encontrada." }); const equipe_id = results[0].equipe_id; const sql = "INSERT INTO Alunos (nome, ra, email, telefone, equipe_id) VALUES (?, ?, ?, ?, ?)"; db.query(sql, [nome, ra, email, telefone, equipe_id], (err, result) => { if (err) return res.status(500).json({ error: "Erro ao cadastrar aluno." }); const novoAluno = { aluno_id: result.insertId, nome, ra, email, telefone, equipe }; res.status(201).json(novoAluno); }); }); };
const updateAluno = (req, res) => { const { id } = req.params; const { nome, ra, email, telefone } = req.body; const sql = `UPDATE Alunos SET nome = ?, ra = ?, email = ?, telefone = ? WHERE aluno_id = ?`; db.query(sql, [nome, ra, email, telefone, id], (err, result) => { if (err) return res.status(500).json({ error: "Erro ao atualizar aluno." }); if (result.affectedRows === 0) return res.status(404).json({ error: "Aluno não encontrado." }); res.status(200).json({ message: "Aluno atualizado com sucesso." }); }); };
const deleteAluno = (req, res) => { const { id } = req.params; db.query(`DELETE FROM Alunos WHERE aluno_id = ?`, [id], (err, result) => { if (err) return res.status(500).json({ error: "Erro ao excluir aluno." }); if (result.affectedRows === 0) return res.status(404).json({ error: "Aluno não encontrado." }); res.status(200).json({ message: "Aluno excluído com sucesso." }); }); };
const getFamilias = (req, res) => { db.query("SELECT * FROM Familias", (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar famílias." }); return res.json(data); }); };
const createFamilia = (req, res) => { const { nome, regiao } = req.body; db.query("INSERT INTO Familias (nome, regiao) VALUES (?, ?)", [nome, regiao], (err, result) => { if (err) return res.status(500).json({ error: "Erro ao cadastrar família." }); const novaFamilia = { familia_id: result.insertId, nome, regiao }; res.status(201).json(novaFamilia); }); };
const getCampanhas = (req, res) => { db.query("SELECT * FROM Campanhas ORDER BY data_termino DESC", (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar campanhas." }); return res.json(data); }); };
const createCampanha = (req, res) => { const { nome, dataTermino, metaDinheiro, metaItens } = req.body; const sql = "INSERT INTO Campanhas (nome, data_termino, meta_dinheiro, meta_itens) VALUES (?, ?, ?, ?)"; db.query(sql, [nome, dataTermino, metaDinheiro, metaItens], (err, result) => { if (err) return res.status(500).json({ error: "Erro ao criar campanha." }); const novaCampanha = { campanha_id: result.insertId, nome, data_termino: dataTermino, meta_dinheiro: metaDinheiro, meta_itens: metaItens }; res.status(201).json(novaCampanha); }); };
const getAvisos = (req, res) => { db.query("SELECT * FROM Avisos ORDER BY data_publicacao DESC", (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar avisos." }); return res.json(data); }); };
const createAviso = (req, res) => { const { mensagem } = req.body; db.query("INSERT INTO Avisos (mensagem) VALUES (?)", [mensagem], (err, result) => { if (err) return res.status(500).json({ error: "Erro ao adicionar aviso." }); db.query("SELECT * FROM Avisos WHERE aviso_id = ?", [result.insertId], (selectErr, newRecord) => { if(selectErr) return res.status(500).json({ error: "Erro ao buscar aviso criado." }); res.status(201).json(newRecord[0]); }); }); };
const getEstoque = (req, res) => { const sql = `SELECT ei.nome AS item, ei.categoria, COALESCE(SUM(CASE WHEN ta.tipo = 'Entrada' THEN ta.quantidade ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN ta.tipo = 'Saida' THEN ta.quantidade ELSE 0 END), 0) AS qtd FROM Estoque_Itens ei LEFT JOIN Transacoes_Alimentos ta ON ei.item_id = ta.item_id GROUP BY ei.item_id, ei.nome, ei.categoria;`; db.query(sql, (err, data) => { if (err) return res.status(500).json({ error: "Erro ao calcular estoque." }); return res.json(data); }); };
const getHistoricoSaidas = (req, res) => { const sql = `SELECT ta.data, ei.nome as item, ta.quantidade as qtd, f.nome as destino FROM Transacoes_Alimentos ta JOIN Estoque_Itens ei ON ta.item_id = ei.item_id JOIN Familias f ON ta.familia_id = f.familia_id WHERE ta.tipo = 'Saida' ORDER BY ta.data DESC`; db.query(sql, (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar histórico de saídas." }); return res.json(data); }); };
const getDoacoes = (req, res) => { const sql = "SELECT Doacoes_Dinheiro.*, Campanhas.nome as campanha_nome FROM Doacoes_Dinheiro LEFT JOIN Campanhas ON Doacoes_Dinheiro.campanha_id = Campanhas.campanha_id ORDER BY data DESC"; db.query(sql, (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar doações." }); return res.json(data); }); };
const getTransacoesAlimentos = (req, res) => { const sql = `SELECT ta.transacao_id, ta.tipo, ta.quantidade, ta.data, ta.nota_fiscal, ta.campanha_id, ei.nome AS item, e.nome AS equipe, f.nome AS destino, c.nome as campanha_nome FROM Transacoes_Alimentos ta JOIN Estoque_Itens ei ON ta.item_id = ei.item_id LEFT JOIN Equipes e ON ta.equipe_id = e.equipe_id LEFT JOIN Familias f ON ta.familia_id = f.familia_id LEFT JOIN Campanhas c ON ta.campanha_id = c.campanha_id ORDER BY ta.data DESC`; db.query(sql, (err, data) => { if (err) return res.status(500).json({ error: "Erro ao buscar transações de alimentos." }); return res.json(data); }); };

// ▼▼▼ FUNÇÕES DE CRIAÇÃO QUE ESTAVAM EM FALTA ▼▼▼
const createDoacao = (req, res) => {
    const { valor, data, doador, modo, equipe, campanha_id } = req.body;
    const comprovantePath = req.file ? req.file.path : null;
    db.query("SELECT equipe_id FROM Equipes WHERE nome = ?", [equipe], (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: "Equipe não encontrada." });
        const equipe_id = results[0].equipe_id;
        const sqlInsert = "INSERT INTO Doacoes_Dinheiro (valor, data, doador, modo, equipe_id, campanha_id, comprovante_path) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(sqlInsert, [valor, data, doador, modo, equipe_id, campanha_id || null, comprovantePath], (err, result) => {
            if (err) {
                console.error("❌ ERRO DETALHADO DO MYSQL ao adicionar doação:", err);
                return res.status(500).json({ error: "Erro ao adicionar doação." });
            }
            const sqlUpdate = "UPDATE Equipes SET valor = valor + ? WHERE equipe_id = ?";
            db.query(sqlUpdate, [valor, equipe_id], (updateErr) => {
                if (updateErr) return res.status(500).json({ error: "Erro ao atualizar total da equipe." });
                res.status(201).json({ message: "Doação registrada com sucesso." });
            });
        });
    });
};

const createTransacaoAlimento = (req, res) => {
    const { tipo, itens, equipe, destino, campanha_id } = req.body;
    const notaFiscalPath = req.file ? req.file.path : null;
    const parsedItens = JSON.parse(itens);

    if (tipo === 'Entrada') {
        db.query("SELECT equipe_id FROM Equipes WHERE nome = ?", [equipe], (err, equipeResults) => {
            if (err || equipeResults.length === 0) return res.status(400).json({ error: "Equipe não encontrada." });
            const equipe_id = equipeResults[0].equipe_id;
            
            parsedItens.forEach(item => {
                db.query("SELECT item_id FROM Estoque_Itens WHERE nome = ?", [item.item], (err, itemResults) => {
                    if (err || itemResults.length === 0) { console.error(`Item não encontrado: ${item.item}`); return; }
                    const item_id = itemResults[0].item_id;
                    const sqlInsert = "INSERT INTO Transacoes_Alimentos (item_id, tipo, quantidade, equipe_id, nota_fiscal, campanha_id) VALUES (?, 'Entrada', ?, ?, ?, ?)";
                    db.query(sqlInsert, [item_id, item.qtd, equipe_id, notaFiscalPath, campanha_id || null], (err, result) => {
                        if (err) { console.error("Erro ao inserir transação de alimento:", err); return; }
                        const sqlUpdate = "UPDATE Equipes SET alimentos = alimentos + ? WHERE equipe_id = ?";
                        db.query(sqlUpdate, [item.qtd, equipe_id]);
                    });
                });
            });
            res.status(201).json({ message: "Entrada registrada com sucesso!" });
        });
    } else { // Saída
        db.query("SELECT familia_id FROM Familias WHERE nome = ?", [destino], (err, familiaResults) => {
            if (err || familiaResults.length === 0) return res.status(400).json({ error: "Família não encontrada." });
            const familia_id = familiaResults[0].familia_id;
            parsedItens.forEach(item => {
                db.query("SELECT item_id FROM Estoque_Itens WHERE nome = ?", [item.item], (err, itemResults) => {
                    if (err || itemResults.length === 0) { console.error(`Item não encontrado: ${item.item}`); return; }
                    const item_id = itemResults[0].item_id;
                    const sql = "INSERT INTO Transacoes_Alimentos (item_id, tipo, quantidade, familia_id) VALUES (?, 'Saida', ?, ?)";
                    db.query(sql, [item_id, item.qtd, familia_id]);
                });
            });
            res.status(201).json({ message: "Saída registrada com sucesso!" });
        });
    }
};

module.exports = {
    getPublicImpactData,
    getEquipes, updateEquipe, deleteEquipe,
    getAlunos, createAluno, updateAluno, deleteAluno,
    getFamilias, createFamilia,
    getCampanhas, createCampanha,
    getAvisos, createAviso,
    getEstoque, getHistoricoSaidas, getDoacoes, getTransacoesAlimentos,
    createTransacaoAlimento,
    createDoacao
};

