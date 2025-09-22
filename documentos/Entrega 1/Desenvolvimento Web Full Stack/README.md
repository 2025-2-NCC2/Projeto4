Guia de Configuração Local - Projeto EmpáTech
Este documento é um guia passo a passo completo para configurar e executar o projeto EmpáTech num ambiente de desenvolvimento local, utilizando o Visual Studio Code.

1. Descrição do Projeto
O Dashboard Lideranças Empáticas (EmpáTech) é uma Aplicação Web de Página Única (SPA) completa, desenhada para a gestão integral de projetos de beneficência. A aplicação utiliza a tecnologia MERN (MySQL, Express, React, Node.js).

2. Pré-requisitos
Antes de começar, certifique-se de que tem os seguintes programas instalados no seu computador:

Software

Descrição

🖥️ Visual Studio Code

O nosso editor de código principal.

🟢 Node.js (LTS)

O ambiente de execução para o nosso backend e frontend.

🐬 XAMPP (ou outro servidor MySQL)

Um pacote que inclui um servidor de base de dados MySQL e o Apache.

🛠️ MySQL Workbench (Opcional, mas recomendado)

Uma ferramenta visual para gerir a sua base de dados mais facilmente.

3. Instalação e Configuração
Siga estes passos para configurar todas as partes do projeto.

3.1. Obtendo o Código do Projeto
Descarregue os Ficheiros: Certifique-se de que tem a pasta completa do projeto no seu computador.

Abra no VS Code: Abra a pasta principal do projeto no Visual Studio Code.

3.2. Configurando a Base de Dados
Inicie o XAMPP: Abra o painel de controlo do XAMPP e inicie os módulos Apache e MySQL.

Crie a Base de Dados:

Abra o seu cliente de base de dados (MySQL Workbench ou aceda a http://localhost/phpmyadmin no seu navegador).

Execute o seguinte comando SQL para criar a base de dados:

CREATE DATABASE empatech_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

Crie as Tabelas e Insira os Dados:

Selecione a base de dados empatech_db.

Copie o conteúdo completo do seu ficheiro schema_v2.sql (o que inclui as tabelas Gestores e Equipes com senha_hash).

Cole e execute o script. Isto irá criar todas as suas tabelas.

Em seguida, execute os scripts insert_gestor.sql e insert_equipes_v2.sql para popular a base de dados com os dados iniciais.

3.3. Configurando o Backend (Servidor)
Abra um Terminal no VS Code: No menu de cima, clique em "Terminal" > "New Terminal".

Navegue para a Pasta: No terminal, digite cd backend e pressione Enter.

Instale as Dependências: Execute o comando:

npm install

Crie o Ficheiro .env: Na raiz da pasta backend, crie um ficheiro chamado .env e cole o seguinte:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=empatech_db
DB_PORT=3306
FRONTEND_URL=http://localhost:5173

3.4. Configurando o Frontend (Aplicação React)
Abra um SEGUNDO Terminal: Com o primeiro terminal ainda aberto, clique no ícone de "+" para criar um novo.

Navegue para a Pasta: Neste novo terminal, digite cd frontend e pressione Enter.

Instale as Dependências: Execute o comando:

npm install

Crie o Ficheiro .env: Na raiz da pasta frontend, crie um ficheiro chamado .env e cole o seguinte:

VITE_API_URL=http://localhost:3001/api

4. Rodando o Projeto
Agora que tudo está configurado, vamos iniciar a aplicação.

Inicie o Backend:

No primeiro terminal (o que está na pasta backend), execute:

npm start

Você deverá ver a mensagem: ✅ Backend conectado ao MySQL com sucesso!

Inicie o Frontend:

No segundo terminal (o que está na pasta frontend), execute:

npm run dev

O seu navegador deverá abrir automaticamente no endereço http://localhost:5173.

Parabéns! A sua aplicação EmpáTech está agora a funcionar 100% no seu computador.

5. Solução de Problemas Comuns (Windows PowerShell)
Se, ao executar npm start ou npm run dev, você receber um erro no PowerShell a dizer que "a execução de scripts foi desativada neste sistema", siga estes passos:

Abra o PowerShell como Administrador:

No Menu Iniciar, procure por "PowerShell".

Clique com o botão direito do rato em "Windows PowerShell" e escolha "Executar como administrador".

Execute o Comando de Permissão:

Na janela do PowerShell que abrir, cole o seguinte comando e pressione Enter:

Set-ExecutionPolicy RemoteSigned
