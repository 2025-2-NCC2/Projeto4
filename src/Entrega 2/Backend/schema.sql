-- Remove a base de dados se ela já existir, para garantir um começo limpo.
DROP DATABASE IF EXISTS empatech_db;

-- Cria a nova base de dados.
CREATE DATABASE empatech_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seleciona a base de dados para usar.
USE empatech_db;

-- Tabela para armazenar as equipes e seus mentores.
CREATE TABLE Equipes (
    equipe_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    mentorNome VARCHAR(150) NOT NULL,
    mentorRa VARCHAR(8) NOT NULL,
    mentorEmail VARCHAR(100) NOT NULL,
    mentorTelefone VARCHAR(11),
    valor DECIMAL(10, 2) DEFAULT 0.00,
    alimentos INT DEFAULT 0
);

-- Tabela para armazenar os alunos (integrantes das equipes).
CREATE TABLE Alunos (
    aluno_id INT PRIMARY KEY AUTO_INCREMENT,
    equipe_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    ra VARCHAR(8) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(11),
    FOREIGN KEY (equipe_id) REFERENCES Equipes(equipe_id) ON DELETE CASCADE
);

-- Tabela para armazenar as famílias que recebem ajuda.
CREATE TABLE Familias (
    familia_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    regiao VARCHAR(50) NOT NULL
);

-- Tabela que funciona como um catálogo de todos os itens de alimentos possíveis.
CREATE TABLE Estoque_Itens (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    categoria VARCHAR(50) NOT NULL
);

-- Tabela para armazenar as campanhas de arrecadação.
CREATE TABLE Campanhas (
    campanha_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_termino DATE NOT NULL,
    meta_dinheiro DECIMAL(10, 2) DEFAULT 0.00,
    meta_itens INT DEFAULT 0
);

-- Tabela para o mural de avisos.
CREATE TABLE Avisos (
    aviso_id INT PRIMARY KEY AUTO_INCREMENT,
    mensagem TEXT NOT NULL,
    data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para registar todas as doações em dinheiro.
CREATE TABLE Doacoes_Dinheiro (
    doacao_id INT PRIMARY KEY AUTO_INCREMENT,
    equipe_id INT NOT NULL,
    campanha_id INT NULL, -- Pode ser nulo se não estiver associado a uma campanha
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL,
    modo VARCHAR(50),
    doador VARCHAR(150),
    FOREIGN KEY (equipe_id) REFERENCES Equipes(equipe_id) ON DELETE CASCADE,
    FOREIGN KEY (campanha_id) REFERENCES Campanhas(campanha_id) ON DELETE SET NULL
);

-- Tabela para registar todas as transações de alimentos (entradas e saídas).
CREATE TABLE Transacoes_Alimentos (
    transacao_id INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT NOT NULL,
    tipo ENUM('Entrada', 'Saida') NOT NULL,
    quantidade INT NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    equipe_id INT NULL, -- Obrigatório para Entradas
    familia_id INT NULL, -- Obrigatório para Saídas
    campanha_id INT NULL,
    nota_fiscal VARCHAR(255),
    FOREIGN KEY (item_id) REFERENCES Estoque_Itens(item_id),
    FOREIGN KEY (equipe_id) REFERENCES Equipes(equipe_id) ON DELETE SET NULL,
    FOREIGN KEY (familia_id) REFERENCES Familias(familia_id) ON DELETE SET NULL,
    FOREIGN KEY (campanha_id) REFERENCES Campanhas(campanha_id) ON DELETE SET NULL
);

INSERT INTO Equipes (nome, mentorNome, mentorRa, mentorEmail, mentorTelefone, valor, alimentos)
VALUES
('Equipe Esperança', 'João Silva', '12345678', 'joao.silva@email.com', '11999999999', 1500.00, 200),
('Equipe União', 'Maria Oliveira', '23456789', 'maria.oliveira@email.com', '11988888888', 2300.50, 350),
('Equipe Soliedariedade', 'Carlos Souza', '34567890', 'carlos.souza@email.com', '11977777777', 800.00, 120),
('Equipe Proativa', 'Ana Santos', '45678901', 'ana.santos@email.com', '11966666666', 0.00, 50);

INSERT INTO Estoque_Itens (nome, categoria) VALUES
('Arroz (5kg)', 'Grãos'),
('Feijão (1kg)', 'Grãos'),
('Óleo (900ml)', 'Óleos'),
('Açúcar (1kg)', 'Essenciais'),
('Café (500g)', 'Essenciais'),
('Leite (1L)', 'Laticínios'),
('Macarrão (500g)', 'Massas'),
('Molho de Tomate (340g)', 'Enlatados'),
('Farinha de Trigo (1kg)', 'Farináceos'),
('Fubá (500g)', 'Farináceos'),
('Sal (1kg)', 'Temperos');
