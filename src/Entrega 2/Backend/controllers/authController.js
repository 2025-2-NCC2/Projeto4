// O pool 'pg' usa promises, então podemos usar async/await
const db = require('../config/db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

// --- Funções de Login ---
const loginGestor = async (req, res) => {
    const { email, senha } = req.body;
    const sql = "SELECT * FROM Gestores WHERE email = $1";

    try {
        const { rows } = await db.query(sql, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "Email ou senha inválidos." });
        }
        
        const gestor = rows[0];
        
        // Usamos await para a comparação do bcrypt
        const isMatch = await bcrypt.compare(senha, gestor.senha);

        if (!isMatch) {
            return res.status(401).json({ error: "Email ou senha inválidos." });
        }

        const payload = { id: gestor.gestor_id, nome: gestor.nome, tipo: 'gestor' };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.status(200).json({ token, user: { nome: gestor.nome, tipo: 'gestor' } });

    } catch (err) {
        console.error("Erro no loginGestor:", err);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
};

const loginGrupo = async (req, res) => {
    const { nomeEquipe, senha } = req.body;
    const sql = "SELECT * FROM Equipes WHERE nome = $1";

    try {
        const { rows } = await db.query(sql, [nomeEquipe]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "Nome da equipe ou senha inválidos." });
        }
        
        const equipe = rows[0];
        
        const isMatch = await bcrypt.compare(senha, equipe.senha);

        if (!isMatch) {
            return res.status(401).json({ error: "Nome da equipe ou senha inválidos." });
        }

        const payload = { id: equipe.equipe_id, nome: equipe.nome, tipo: 'grupo' };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.status(200).json({ token, user: { nome: equipe.nome, tipo: 'grupo' } });

    } catch (err) {
        console.error("Erro no loginGrupo:", err);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
};

// --- Funções de Registo ---
const registerGestor = async (req, res) => {
    const { nome, email, senha } = req.body;
    
    try {
        // Usamos await para o hash
        const hash = await bcrypt.hash(senha, saltRounds);
        
        const sql = "INSERT INTO Gestores (nome, email, senha) VALUES ($1, $2, $3)";
        await db.query(sql, [nome, email, hash]);
        
        res.status(201).json({ message: "Gestor cadastrado com sucesso!" });
    } catch (err) {
        console.error("Erro no registerGestor:", err);
        // O código '23505' é o erro de violação de "UNIQUE" no PostgreSQL
        if (err.code === '23505') {
            return res.status(500).json({ error: "Email já cadastrado." });
        }
        res.status(500).json({ error: "Erro ao cadastrar gestor." });
    }
};

const registerGrupo = async (req, res) => {
    const { nome, senha, mentorNome, mentorRa, mentorTelefone, mentorEmail } = req.body;
    
    try {
        const hash = await bcrypt.hash(senha, saltRounds);
        
        const sql = "INSERT INTO Equipes (nome, senha, mentorNome, mentorRa, mentorEmail, mentorTelefone) VALUES ($1, $2, $3, $4, $5, $6)";
        await db.query(sql, [nome, hash, mentorNome, mentorRa, mentorEmail, mentorTelefone]);
        
        res.status(201).json({ message: "Equipe cadastrada com sucesso!" });
    } catch (err) {
        console.error("Erro no registerGrupo:", err);
        if (err.code === '23505') {
            return res.status(500).json({ error: "Nome de equipe já existente." });
        }
        res.status(500).json({ error: "Erro ao cadastrar equipe." });
    }
};

module.exports = {
    loginGestor,
    loginGrupo,
    registerGestor,
    registerGrupo
};