const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

// --- Funções de Login ---
const loginGestor = (req, res) => {
    const { email, senha } = req.body;
    const sql = "SELECT * FROM Gestores WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: "Email ou senha inválidos." });
        const gestor = results[0];
        bcrypt.compare(senha, gestor.senha, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).json({ error: "Email ou senha inválidos." });
            const payload = { id: gestor.gestor_id, nome: gestor.nome, tipo: 'gestor' };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
            res.status(200).json({ token, user: { nome: gestor.nome, tipo: 'gestor' } });
        });
    });
};

const loginGrupo = (req, res) => {
    const { nomeEquipe, senha } = req.body;
    const sql = "SELECT * FROM Equipes WHERE nome = ?";
    db.query(sql, [nomeEquipe], (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: "Nome da equipe ou senha inválidos." });
        const equipe = results[0];
        bcrypt.compare(senha, equipe.senha, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).json({ error: "Nome da equipe ou senha inválidos." });
            const payload = { id: equipe.equipe_id, nome: equipe.nome, tipo: 'grupo' };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
            res.status(200).json({ token, user: { nome: equipe.nome, tipo: 'grupo' } });
        });
    });
};

// --- Funções de Registo ---
const registerGestor = (req, res) => {
    const { nome, email, senha } = req.body;
    bcrypt.hash(senha, saltRounds, (err, hash) => {
        if (err) return res.status(500).json({ error: "Erro ao encriptar a senha." });
        const sql = "INSERT INTO Gestores (nome, email, senha) VALUES (?, ?, ?)";
        db.query(sql, [nome, email, hash], (err, result) => {
            if (err) return res.status(500).json({ error: "Email já cadastrado." });
            res.status(201).json({ message: "Gestor cadastrado com sucesso!" });
        });
    });
};

const registerGrupo = (req, res) => {
    const { nome, senha, mentorNome, mentorRa, mentorTelefone, mentorEmail } = req.body;
    bcrypt.hash(senha, saltRounds, (err, hash) => {
        if (err) return res.status(500).json({ error: "Erro ao encriptar a senha." });
        const sql = "INSERT INTO Equipes (nome, senha, mentorNome, mentorRa, mentorEmail, mentorTelefone) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sql, [nome, hash, mentorNome, mentorRa, mentorEmail, mentorTelefone], (err, result) => {
            if (err) return res.status(500).json({ error: "Nome de equipe já existente." });
            res.status(201).json({ message: "Equipe cadastrada com sucesso!" });
        });
    });
};

module.exports = {
    loginGestor,
    loginGrupo,
    registerGestor,
    registerGrupo
};

