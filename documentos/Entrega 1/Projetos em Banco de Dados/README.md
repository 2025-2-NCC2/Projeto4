# 🐬 Banco de Dados EmpáTech

Este documento contém os **códigos MySQL utilizados para criação das tabelas** do banco de dados do projeto **EmpáTech**.

---

## 📦 Criação da Base de Dados

```sql
-- Cria a nova base de dados.
CREATE DATABASE empatech_db;

-- Seleciona a base de dados para usar.
USE empatech_db;
```

---

## 🏗️ Estrutura das Tabelas

### 1. Equipes
Tabela para armazenar as equipes e seus mentores.

```sql
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
```

---

### 2. Alunos
Tabela para armazenar os alunos (integrantes das equipes).

```sql
CREATE TABLE Alunos (
  aluno_id INT PRIMARY KEY AUTO_INCREMENT,
  equipe_id INT NOT NULL,
  nome VARCHAR(150) NOT NULL,
  ra VARCHAR(8) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(11),
  FOREIGN KEY (equipe_id) REFERENCES Equipes(equipe_id) ON DELETE CASCADE
);
```

---

### 3. Famílias
Tabela para armazenar as famílias que recebem ajuda.

```sql
CREATE TABLE Familias (
  familia_id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  regiao VARCHAR(50) NOT NULL
);
```

---

### 4. Estoque de Itens
Catálogo de todos os itens de alimentos possíveis.

```sql
CREATE TABLE Estoque_Itens (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL UNIQUE,
  categoria VARCHAR(50) NOT NULL
);
```

---

### 5. Campanhas
Tabela para armazenar as campanhas de arrecadação.

```sql
CREATE TABLE Campanhas (
  campanha_id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  data_termino DATE NOT NULL,
  meta_dinheiro DECIMAL(10, 2) DEFAULT 0.00,
  meta_itens INT DEFAULT 0
);
```

---

### 6. Avisos
Tabela para o mural de avisos.

```sql
CREATE TABLE Avisos (
  aviso_id INT PRIMARY KEY AUTO_INCREMENT,
  mensagem TEXT NOT NULL,
  data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

### 7. Doações em Dinheiro
Tabela para registar todas as doações em dinheiro.

```sql
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
```

---

### 8. Transações de Alimentos
Tabela para registrar todas as transações de alimentos (**entradas** e **saídas**).

```sql
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
```

---

## 🧩 Diagrama do Banco de Dados (Engenharia Reversa)

📌 O diagrama das tabelas pode ser visualizado abaixo:  
![Diagrama do Banco de Dados](https://drive.google.com/uc?id=1otv-3WgaFp4SB7_8Da4tBfEwpty7xqu3)

---

✅ Com esse script, toda a estrutura inicial do banco de dados do **EmpáTech** é criada e pronta para uso.
