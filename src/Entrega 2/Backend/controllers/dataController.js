const db = require('../config/db');

// --- FUNÇÕES PÚBLICAS ---
const getPublicImpactData = async (req, res) => {
    // Queries SQL são as mesmas
    const queryFamilias = "SELECT COUNT(*) as totalFamilias FROM Familias;";
    const queryItens = "SELECT SUM(CASE WHEN tipo = 'Entrada' THEN quantidade ELSE -quantidade END) as totalItens FROM Transacoes_Alimentos;";
    const queryDinheiro = "SELECT SUM(valor) as totalDinheiro FROM Doacoes_Dinheiro;";

    try {
        // Executamos todas as queries em paralelo para mais performance
        const [familiasRes, itensRes, dinheiroRes] = await Promise.all([
            db.query(queryFamilias),
            db.query(queryItens),
            db.query(queryDinheiro)
        ]);
        
        const data = {
            // PostgreSQL retorna aliases em minúsculas (a menos que entre aspas)
            totalFamilias: familiasRes.rows[0].totalfamilias || 0,
            totalItens: itensRes.rows[0].totalitens || 0,
            totalDinheiro: dinheiroRes.rows[0].totaldinheiro || 0,
        };
        res.status(200).json(data);
    } catch (err) {
        console.error("Erro em getPublicImpactData:", err);
        res.status(500).json({ error: "Erro ao buscar dados de impacto." });
    }
};


// --- CONTROLADORES PRIVADOS ---
const getEquipes = async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM Equipes");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar equipes." });
    }
};

const updateEquipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, mentorNome, mentorRa, mentorEmail, mentorTelefone } = req.body;
        // Placeholders mudam de ? para $1, $2, etc.
        const sql = `UPDATE Equipes SET nome = $1, mentorNome = $2, mentorRa = $3, mentorEmail = $4, mentorTelefone = $5 WHERE equipe_id = $6`;
        // `result.rowCount` substitui `result.affectedRows`
        const { rowCount } = await db.query(sql, [nome, mentorNome, mentorRa, mentorEmail, mentorTelefone, id]);
        
        if (rowCount === 0) return res.status(404).json({ error: "Equipe não encontrada." });
        res.status(200).json({ message: "Equipe atualizada com sucesso." });
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar equipe." });
    }
};

const deleteEquipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await db.query(`DELETE FROM Equipes WHERE equipe_id = $1`, [id]);
        if (rowCount === 0) return res.status(404).json({ error: "Equipe não encontrada." });
        res.status(200).json({ message: "Equipe excluída com sucesso." });
    } catch (err) {
        res.status(500).json({ error: "Erro ao excluir equipe." });
    }
};

const getAlunos = async (req, res) => {
    try {
        const sql = `SELECT a.aluno_id, a.nome, a.ra, a.email, a.telefone, e.nome AS equipe FROM Alunos a JOIN Equipes e ON a.equipe_id = e.equipe_id;`;
        const { rows } = await db.query(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar alunos." });
    }
};

const createAluno = async (req, res) => {
    try {
        const { nome, ra, email, telefone, equipe } = req.body;
        
        const { rows: equipeRows } = await db.query("SELECT equipe_id FROM Equipes WHERE nome = $1", [equipe]);
        if (equipeRows.length === 0) return res.status(400).json({ error: "Equipe não encontrada." });
        
        const equipe_id = equipeRows[0].equipe_id;
        
        // Usamos RETURNING * para pegar o novo aluno, substituindo result.insertId
        const sql = "INSERT INTO Alunos (nome, ra, email, telefone, equipe_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const { rows } = await db.query(sql, [nome, ra, email, telefone, equipe_id]);
        
        // Adicionamos o nome da equipe de volta para consistência
        const novoAluno = { ...rows[0], equipe };
        res.status(201).json(novoAluno);
    } catch (err) {
        res.status(500).json({ error: "Erro ao cadastrar aluno." });
    }
};

const updateAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, ra, email, telefone } = req.body;
        const sql = `UPDATE Alunos SET nome = $1, ra = $2, email = $3, telefone = $4 WHERE aluno_id = $5`;
        const { rowCount } = await db.query(sql, [nome, ra, email, telefone, id]);
        
        if (rowCount === 0) return res.status(404).json({ error: "Aluno não encontrado." });
        res.status(200).json({ message: "Aluno atualizado com sucesso." });
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar aluno." });
    }
};

const deleteAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await db.query(`DELETE FROM Alunos WHERE aluno_id = $1`, [id]);
        if (rowCount === 0) return res.status(404).json({ error: "Aluno não encontrado." });
        res.status(200).json({ message: "Aluno excluído com sucesso." });
    } catch (err) {
        res.status(500).json({ error: "Erro ao excluir aluno." });
    }
};

const getFamilias = async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM Familias");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar famílias." });
    }
};

const createFamilia = async (req, res) => {
    try {
        const { nome, regiao } = req.body;
        const sql = "INSERT INTO Familias (nome, regiao) VALUES ($1, $2) RETURNING *";
        const { rows } = await db.query(sql, [nome, regiao]);
        res.status(201).json(rows[0]); // rows[0] é o novo registro
    } catch (err) {
        res.status(500).json({ error: "Erro ao cadastrar família." });
    }
};

const getCampanhas = async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM Campanhas ORDER BY data_termino DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar campanhas." });
    }
};

const createCampanha = async (req, res) => {
    try {
        const { nome, dataTermino, metaDinheiro, metaItens } = req.body;
        const sql = "INSERT INTO Campanhas (nome, data_termino, meta_dinheiro, meta_itens) VALUES ($1, $2, $3, $4) RETURNING *";
        const { rows } = await db.query(sql, [nome, dataTermino, metaDinheiro, metaItens]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar campanha." });
    }
};

const getAvisos = async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM Avisos ORDER BY data_publicacao DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar avisos." });
    }
};

const createAviso = async (req, res) => {
    try {
        const { mensagem } = req.body;
        const { rows } = await db.query("INSERT INTO Avisos (mensagem) VALUES ($1) RETURNING *", [mensagem]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Erro ao adicionar aviso." });
    }
};

const getEstoque = async (req, res) => {
    try {
        const sql = `SELECT ei.nome AS item, ei.categoria, COALESCE(SUM(CASE WHEN ta.tipo = 'Entrada' THEN ta.quantidade ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN ta.tipo = 'Saida' THEN ta.quantidade ELSE 0 END), 0) AS qtd FROM Estoque_Itens ei LEFT JOIN Transacoes_Alimentos ta ON ei.item_id = ta.item_id GROUP BY ei.item_id, ei.nome, ei.categoria;`;
        const { rows } = await db.query(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao calcular estoque." });
    }
};

const getHistoricoSaidas = async (req, res) => {
    try {
        const sql = `SELECT ta.data, ei.nome as item, ta.quantidade as qtd, f.nome as destino FROM Transacoes_Alimentos ta JOIN Estoque_Itens ei ON ta.item_id = ei.item_id JOIN Familias f ON ta.familia_id = f.familia_id WHERE ta.tipo = 'Saida' ORDER BY ta.data DESC`;
        const { rows } = await db.query(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar histórico de saídas." });
    }
};

const getDoacoes = async (req, res) => {
    try {
        const sql = "SELECT Doacoes_Dinheiro.*, Campanhas.nome as campanha_nome FROM Doacoes_Dinheiro LEFT JOIN Campanhas ON Doacoes_Dinheiro.campanha_id = Campanhas.campanha_id ORDER BY data DESC";
        const { rows } = await db.query(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar doações." });
    }
};

const getTransacoesAlimentos = async (req, res) => {
    try {
        const sql = `SELECT ta.transacao_id, ta.tipo, ta.quantidade, ta.data, ta.nota_fiscal, ta.campanha_id, ei.nome AS item, e.nome AS equipe, f.nome AS destino, c.nome as campanha_nome FROM Transacoes_Alimentos ta JOIN Estoque_Itens ei ON ta.item_id = ei.item_id LEFT JOIN Equipes e ON ta.equipe_id = e.equipe_id LEFT JOIN Familias f ON ta.familia_id = f.familia_id LEFT JOIN Campanhas c ON ta.campanha_id = c.campanha_id ORDER BY ta.data DESC`;
        const { rows } = await db.query(sql);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar transações de alimentos." });
    }
};

// ▼▼▼ FUNÇÕES DE CRIAÇÃO ATUALIZADAS ▼▼▼
const createDoacao = async (req, res) => {
    const { valor, data, doador, modo, equipe, campanha_id } = req.body;
    const comprovantePath = req.file ? req.file.path : null;

    try {
        const { rows } = await db.query("SELECT equipe_id FROM Equipes WHERE nome = $1", [equipe]);
        if (rows.length === 0) return res.status(400).json({ error: "Equipe não encontrada." });
        
        const equipe_id = rows[0].equipe_id;
        
        const sqlInsert = "INSERT INTO Doacoes_Dinheiro (valor, data, doador, modo, equipe_id, campanha_id, comprovante_path) VALUES ($1, $2, $3, $4, $5, $6, $7)";
        await db.query(sqlInsert, [valor, data, doador, modo, equipe_id, campanha_id || null, comprovantePath]);
        
        const sqlUpdate = "UPDATE Equipes SET valor = valor + $1 WHERE equipe_id = $2";
        await db.query(sqlUpdate, [valor, equipe_id]);
        
        res.status(201).json({ message: "Doação registrada com sucesso." });
        
    } catch (err) {
        console.error("❌ ERRO DETALHADO DO PG ao adicionar doação:", err);
        return res.status(500).json({ error: "Erro ao adicionar doação." });
    }
};

// Esta função foi reescrita para usar loops 'for...of' que funcionam com 'await',
// corrigindo um bug onde a resposta era enviada antes das queries terminarem.
const createTransacaoAlimento = async (req, res) => {
    const { tipo, itens, equipe, destino, campanha_id } = req.body;
    const notaFiscalPath = req.file ? req.file.path : null;
    const parsedItens = JSON.parse(itens);

    try {
        if (tipo === 'Entrada') {
            const { rows: equipeRows } = await db.query("SELECT equipe_id FROM Equipes WHERE nome = $1", [equipe]);
            if (equipeRows.length === 0) return res.status(400).json({ error: "Equipe não encontrada." });
            
            const equipe_id = equipeRows[0].equipe_id;
            
            // Usamos 'for...of' para que o 'await' funcione corretamente dentro do loop
            for (const item of parsedItens) {
                const { rows: itemRows } = await db.query("SELECT item_id FROM Estoque_Itens WHERE nome = $1", [item.item]);
                
                if (itemRows.length > 0) {
                    const item_id = itemRows[0].item_id;
                    const sqlInsert = "INSERT INTO Transacoes_Alimentos (item_id, tipo, quantidade, equipe_id, nota_fiscal, campanha_id) VALUES ($1, 'Entrada', $2, $3, $4, $5)";
                    await db.query(sqlInsert, [item_id, item.qtd, equipe_id, notaFiscalPath, campanha_id || null]);
                    
                    const sqlUpdate = "UPDATE Equipes SET alimentos = alimentos + $1 WHERE equipe_id = $2";
                    await db.query(sqlUpdate, [item.qtd, equipe_id]);
                } else {
                    console.error(`Item não encontrado: ${item.item}`);
                    // Continua para o próximo item
                }
            }
            res.status(201).json({ message: "Entrada registrada com sucesso!" });

        } else { // Saída
            const { rows: familiaRows } = await db.query("SELECT familia_id FROM Familias WHERE nome = $1", [destino]);
            if (familiaRows.length === 0) return res.status(400).json({ error: "Família não encontrada." });

            const familia_id = familiaRows[0].familia_id;

            for (const item of parsedItens) {
                const { rows: itemRows } = await db.query("SELECT item_id FROM Estoque_Itens WHERE nome = $1", [item.item]);
                
                if (itemRows.length > 0) {
                    const item_id = itemRows[0].item_id;
                    const sql = "INSERT INTO Transacoes_Alimentos (item_id, tipo, quantidade, familia_id) VALUES ($1, 'Saida', $2, $3)";
                    await db.query(sql, [item_id, item.qtd, familia_id]);
                } else {
                     console.error(`Item não encontrado: ${item.item}`);
                }
            }
            res.status(201).json({ message: "Saída registrada com sucesso!" });
        }
    } catch (err) {
        console.error("Erro em createTransacaoAlimento:", err);
        res.status(500).json({ error: "Erro ao registrar transação de alimento." });
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