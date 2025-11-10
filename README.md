# 🏫 FECAP - Fundação de Comércio Álvares Penteado

<p align="center">
  <a href="https://www.fecap.br/">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" 
         alt="FECAP - Fundação de Comércio Álvares Penteado" width="150">
  </a>
</p>

---

# 💡 Projeto EmpáTech  
### Programa: **Lideranças Empáticas**

---

## 👥 Integrantes

- [Breno Sales Colaneri](https://www.linkedin.com/in/breno-sales-colaneri-231b59322/)  
- [Guilherme Leão Rodrigues](https://www.linkedin.com/in/guilherme-le%C3%A3o-277053347/)  
- [Izabelli Ribeiro dos Santos](https://www.linkedin.com/in/izabelliribeiro/)  
- [Rafael Chagas Silva](https://www.linkedin.com/in/rafael-chagas-0648a6349/)

### 👨‍🏫 Professores Orientadores
Kátia Milani Lara Bossi • Cristina Machado Corrêa Leite • Francisco de Souza Escobar •  
David de Oliveira Lemes • Jésus Gomes

---

## 📖 Índice
1. [Descrição do Projeto](#-descrição-do-projeto)  
2. [Tecnologias Utilizadas](#️-tecnologias-utilizadas)  
3. [Estrutura do Projeto](#-estrutura-do-projeto)  
4. [Aplicação em Produção](#-aplicação-em-produção-links)  
5. [Como Executar o Projeto Localmente](#️-como-executar-o-projeto-localmente)  
   - [Pré-requisitos](#-pré-requisitos)  
   - [Configuração do Banco de Dados](#-configuração-do-banco-de-dados-postgresql)  
   - [Configuração do Backend](#-configuração-do-backend-servidor)  
   - [Configuração do Frontend](#-configuração-do-frontend-aplicação-react)  
   - [Executando a Aplicação](#-executando-a-aplicação)  
6. [Documentação da API](#-documentação-da-api)  
7. [Modelagem de Dados e Documentos](#-modelagem-de-dados-e-documentos)  
8. [Vídeo Demonstrativo](#-vídeo-demonstrativo)  
9. [Licença](#-licença)  
10. [Referências](#-referências)

---

## 📙 Descrição do Projeto

O **EmpáTech** visa apoiar e otimizar a gestão do programa **Lideranças Empáticas**, uma iniciativa voltada à arrecadação e distribuição de cestas básicas para famílias em situação de vulnerabilidade.

A plataforma permite o **controle de doações (dinheiro e alimentos)** e sua **destinação organizada**.

### Perfis de Acesso
- **Dashboard do Gestor:** acesso completo (equipes, voluntários, famílias, finanças, campanhas e comunicados).  
- **Dashboard do Grupo:** acesso restrito (gerir equipe e registrar doações).

---

## 🧱 Stack de Tecnologia

A aplicação utiliza a **stack PERN**:  
(PostgreSQL, Express, React, Node.js)

| Camada | Tecnologia | Descrição |
|--------|-------------|-----------|
| **Frontend** | React.js (Vite) + Tailwind CSS | Interface moderna e responsiva |
| **Backend** | Node.js + Express.js | API RESTful e autenticação JWT |
| **Banco de Dados** | PostgreSQL | Armazenamento de dados |
| **Deploy** | Render (API) e Netlify (Frontend) | Hospedagem gratuita e contínua |

---

## 📁 Estrutura do Projeto

```
empatech-projeto/
├── backend/
│   ├── config/
│   │   └── db.js              # Conexão com PostgreSQL
│   ├── controllers/
│   │   ├── authController.js  # Login e registro
│   │   └── dataController.js  # CRUD de dados
│   ├── middleware/
│   │   └── authMiddleware.js  # Validação de JWT
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── dataRoutes.js
│   ├── uploads/               # Uploads de comprovantes
│   ├── .env.example
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── config/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🚀 Aplicação em Produção (Links)

| Ambiente | URL |
|-----------|-----|
| 🌐 **Frontend (Netlify)** | https://empatech2.netlify.app/ |
| ⚙️ **Backend (Render)** | https://empatech-api.onrender.com/api |

---

## ⚙️ Como Executar o Projeto Localmente

### 📌 Pré-requisitos

| Requisito | Descrição |
|------------|------------|
| **Node.js (LTS)** | Ambiente de execução |
| **Git** | Controle de versão |
| **VS Code** | Editor de código |
| **PostgreSQL** | Banco de dados |
| **PgAdmin / DBeaver** | Gerenciador SQL visual |

---

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/BrenoColaneri/empatech-db.git
cd empatech-db
```

---

### 2️⃣ Configuração do Banco de Dados (PostgreSQL)

1. Inicie o **PostgreSQL** local.  
2. Crie o banco:
   - Nome recomendado: `empatech_db`
3. Execute o **script SQL** que está na pasta `documentos/`.
4. (Opcional) Importe o arquivo de backup `.sql` caso exista.

---

### 3️⃣ Configuração do Backend (Servidor)

```bash
cd backend
npm install
```

Crie um arquivo `.env` com o seguinte conteúdo:

```env
DATABASE_URL=postgresql://USUARIO:SENHA@localhost:5432/empatech_db
JWT_SECRET=meu_segredo_super_secreto_123
FRONTEND_URL=http://localhost:5173
```

---

### 4️⃣ Configuração do Frontend (Aplicação React)

```bash
cd frontend
npm install
```

Crie o arquivo `.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

---

### 5️⃣ Executando a Aplicação

**Terminal 1 – Backend**
```bash
npm start
```
> ✅ Backend conectado ao PostgreSQL com sucesso!

**Terminal 2 – Frontend**
```bash
npm run dev
```
> Abra: http://localhost:5173

---

## 🔑 Documentação da API

### 🧠 URL Base
| Ambiente | URL |
|-----------|-----|
| **Local** | http://localhost:3001/api |
| **Produção** | https://empatech-api.onrender.com/api |

### 🔒 Autenticação (Bearer Token)
- A maioria das rotas exige **JWT Token**.  
- O token é obtido após o login (rota `/api/auth/login/...`).  
- Envie-o no cabeçalho:  
  ```
  Authorization: Bearer <seu_token>
  ```

---

## 📡 Endpoints da API

### 🧩 1. Autenticação (`/api/auth`)

#### POST `/login/gestor`
Autentica um gestor.  
**Body:**
```json
{
  "email": "admin@empatech.com",
  "senha": "admin123"
}
```

#### POST `/login/grupo`
Autentica uma equipe.  
**Body:**
```json
{
  "nomeEquipe": "Equipe União",
  "senha": "senha123"
}
```

#### POST `/register/grupo`
Registra nova equipe (apenas Gestor).  
**Body:**
```json
{
  "nome": "Equipe Nova",
  "senha": "senhaNova123",
  "mentorNome": "Nome do Mentor",
  "mentorRa": "12345678",
  "mentorEmail": "mentor@email.com",
  "mentorTelefone": "11987654321"
}
```

---

### 🌍 2. Rota Pública (`/api/public`)

#### GET `/impact`
Retorna dados públicos de impacto.
```json
{
  "totalFamilias": "6",
  "totalItens": "25",
  "totalDinheiro": "500.00"
}
```

---

### 📦 3. Rotas Protegidas (Requer Token)

#### GET `/equipes`
Lista todas as equipes.

#### PUT `/equipes/:id`
Atualiza uma equipe.
```json
{
  "nome": "Equipe União (Editada)",
  "mentorNome": "Novo Nome",
  "mentorEmail": "novo@email.com"
}
```

#### DELETE `/equipes/:id`
Remove uma equipe e seus membros.

#### GET `/alunos`
Lista todos os alunos.

#### POST `/alunos`
Registra um novo aluno.
```json
{
  "nome": "Novo Aluno",
  "ra": "11223344",
  "email": "aluno@email.com",
  "telefone": "11922223333",
  "equipe": "Equipe União"
}
```

#### POST `/doacoes`
Registra doação em dinheiro (`form-data`):
- `valor` (Number)  
- `data` (String)  
- `doador` (String)  
- `modo` (PIX, Transferência, etc.)  
- `comprovante` (File)

#### POST `/transacoes-alimentos`
Registra entrada/saída de alimentos (`form-data`):
- `tipo` ("Entrada" ou "Saida")  
- `itens` (JSON string)  
- `equipe` ou `destino`  

---

## 🎲 Modelagem de Dados e Documentos

📂 [Abrir modelagem de dados](/documentos/Entrega%201/Projetos%20em%20Banco%20de%20Dados)  
📂 [Abrir scripts SQL](/documentos/Entrega%202/Projetos%20em%20Banco%20de%20Dados)

---

## 🎬 Vídeo Demonstrativo

🎥 [Assistir no Google Drive](https://drive.google.com/file/d/1QcDmCTtbyJ8ytsx4OobmMN1AIscKjgGn/view?usp=sharing)

---

## 📋 Licença

<a href="http://creativecommons.org/licenses/by/4.0/">EmpáTech</a> © 2025  
por [Rafael Chagas Silva](https://www.linkedin.com/in/rafael-chagas-0648a6349/)  
Licenciado sob [Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/)

---

## 🎓 Referências

1. https://github.com/iuricode/readme-template  
2. https://github.com/gabrieldejesus/readme-model  
3. https://chooser-beta.creativecommons.org/  
4. https://www.toptal.com/developers/gitignore
