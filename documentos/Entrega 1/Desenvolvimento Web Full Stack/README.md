# 📊 EmpáTech - Dashboard Lideranças Empáticas

O **Dashboard Lideranças Empáticas (EmpáTech)** é uma **Aplicação Web de Página Única (SPA)** desenhada para a **gestão integral de projetos de beneficência**.  
O projeto utiliza a stack **MERN (MySQL, Express, React, Node.js)**.

---

## 📌 Pré-requisitos

Antes de começar, certifique-se de que possui os seguintes programas instalados no seu computador:

| Software              | Descrição                                                                 |
|-----------------------|---------------------------------------------------------------------------|
| 🖥️ **Visual Studio Code** | Editor de código principal.                                              |
| 🟢 **Node.js (LTS)**      | Ambiente de execução para backend e frontend.                          |
| 🐬 **XAMPP** (ou outro servidor MySQL) | Inclui servidor MySQL e Apache.                         |
| 🛠️ **MySQL Workbench** (opcional) | Ferramenta visual para gestão do banco de dados.             |

---

## ⚙️ Instalação e Configuração

### 1. 📂 Obtendo o Código do Projeto
1. **Descompacte o projeto**: localize o arquivo `dashboard local.zip` e extraia-o em uma pasta de sua preferência.  
2. **Abra no VS Code**: abra a pasta extraída (`dashboard local`) no **Visual Studio Code**.

---

### 2. 🐬 Configurando a Base de Dados
1. **Inicie o XAMPP**: abra o painel de controlo do XAMPP e inicie os módulos **Apache** e **MySQL**.
2. **Importe o backup da base de dados**:
   - Abra o **MySQL Workbench** e conecte-se ao servidor local (`localhost`).
   - Vá até **Server > Data Import**.
   - Selecione a opção **Import from Self-Contained File**.
   - Clique em **...** e selecione o arquivo `backup empatech_db.sql` que está na pasta do projeto.
   - Na seção **Default Schema to be Imported to**, escolha **New** e digite `empatech_db`.
   - Clique em **Start Import**.  
   Isso criará automaticamente a base de dados `empatech_db` com todas as tabelas e dados.

---

### 3. 🖥️ Configurando o Backend (Servidor)
1. Abra um **terminal no VS Code**:  
   Menu superior → `Terminal` → `New Terminal`.
2. Navegue até a pasta do backend:

   ```bash
   cd backend
   ```
3. Instale as dependências:

   ```bash
   npm install
   ```
4. Crie um arquivo `.env` dentro da pasta `backend` com o seguinte conteúdo:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_DATABASE=empatech_db
   DB_PORT=3306
   FRONTEND_URL=http://localhost:5173
   ```

---

### 4. ⚛️ Configurando o Frontend (Aplicação React)
1. Abra um **segundo terminal** no VS Code.
2. Navegue até a pasta do frontend:

   ```bash
   cd frontend
   ```
3. Instale as dependências:

   ```bash
   npm install
   ```
4. Crie um arquivo `.env` dentro da pasta `frontend` com o seguinte conteúdo:

   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

---

## 🚀 Rodando o Projeto

### 1. Iniciar o Backend
No terminal da pasta `backend`, execute:

```bash
npm start
```

Você deverá ver a mensagem:

```
✅ Backend conectado ao MySQL com sucesso!
```

### 2. Iniciar o Frontend
No terminal da pasta `frontend`, execute:

```bash
npm run dev
```

O navegador abrirá automaticamente em:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Solução de Problemas (Windows PowerShell)

Se, ao executar `npm start` ou `npm run dev`, aparecer o erro:

```
a execução de scripts foi desativada neste sistema
```

### 🔧 Como resolver:
1. Abra o **PowerShell como Administrador**:
   - Menu Iniciar → Procurar por *PowerShell* → Botão direito → *Executar como administrador*.
2. Execute o comando:

   ```powershell
   Set-ExecutionPolicy RemoteSigned
   ```

---

✅ Agora o **EmpáTech** está rodando 100% no seu ambiente local! 🎉
