const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Procura pelo token no cabeçalho de autorização
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // O token vem no formato "Bearer TOKEN"

    // Se não houver token, retorna um erro de "Não Autorizado"
    if (token == null) {
        return res.sendStatus(401);
    }

    // Verifica se o token é válido e não expirou
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Se o token for inválido, retorna um erro de "Acesso Proibido"
        if (err) {
            return res.sendStatus(403);
        }
        // Se o token for válido, adiciona a informação do utilizador ao pedido
        req.user = user;
        // Permite que o pedido continue para a sua rota final
        next();
    });
};

module.exports = { authenticateToken };
