FECAP - Fundação de Comércio Álvares Penteado<p align="center"><a href= "https://www.fecap.br/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP - Fundação de Comércio Álvares Penteado" width="150" border="0"></a></p>Lideranças Empáticas - Projeto EmpáTechIntegrantes<a href="https://www.linkedin.com/in/breno-sales-colaneri-231b59322/">Breno Sales Colaneri</a><a href="https://www.linkedin.com/in/guilherme-le%C3%A3o-277053347/">Guilherme Leão Rodrigues</a><a href="https://www.linkedin.com/in/izabelliribeiro/">Izabelli Ribeiro dos Santos</a><a href="https://www.linkedin.com/in/rafael-chagas-0648a6349/">Rafael Chagas Silva</a>Professores OrientadoresKátia Milani Lara Bossi, Cristina Machado Correa Leite, Francisco de Souza Escobar, David de Oliveira Lemes, Jésus Gomes📖 ÍndiceDescrição do ProjetoTecnologias UtilizadasEstrutura do ProjetoAplicação em ProduçãoComo Executar o Projeto LocalmentePré-requisitosConfiguração do Banco de Dados (PostgreSQL)Configuração do Backend (Servidor)Configuração do Frontend (Aplicação React)Executando a AplicaçãoDocumentação da APIAutenticação (Bearer Token)Endpoints da APIModelagem de Dados e DocumentosVídeo DemonstrativoLicençaReferências📙 Descrição do ProjetoO projeto EmpáTech visa apoiar e otimizar a gestão do programa Lideranças Empáticas, uma iniciativa voltada à arrecadação e distribuição de cestas básicas para famílias em situação de vulnerabilidade.Para isso, desenvolvemos uma plataforma digital que permite o controlo organizado das doações (dinheiro e alimentos) e sua respetiva destinação. O sistema contempla dois perfis de acesso:Dashboard do Gestor: Acesso administrativo completo para gerir equipas, voluntários, famílias, finanças, campanhas e comunicações.Dashboard do Grupo: Acesso restrito para equipas de voluntários registarem as suas próprias doações e gerirem os seus membros.Stack de TecnologiaA aplicação foi desenvolvida com base na stack PERN (PostgreSQL, Express, React, Node.js), embora o desenvolvimento inicial tenha sido feito com MySQL. A migração para PostgreSQL foi realizada para permitir o deploy gratuito no Render.Frontend: Construído com React.js (Vite) e estilizado com Tailwind CSS.Backend: Construído com Node.js e Express.js, funcionando como uma API RESTful.Base de Dados: Utiliza PostgreSQL para armazenamento de dados.🛠️ Tecnologias UtilizadasFrontendBackendBase de DadosDeploy📁 Estrutura do ProjetoO código-fonte está dividido em duas pastas principais: frontend e backend.empatech-projeto/
├── backend/
│   ├── config/
│   │   └── db.js           # Conexão com o banco de dados PostgreSQL
│   ├── controllers/
│   │   ├── authController.js # Lógica de login e registo
│   │   └── dataController.js # Lógica de CRUD (Equipas, Alunos, etc.)
│   ├── middleware/
│   │   └── authMiddleware.js # Validação de token JWT
│   ├── routes/
│   │   ├── authRoutes.js     # Rotas de autenticação
│   │   └── dataRoutes.js     # Rotas de dados
│   ├── uploads/            # Pasta para onde os comprovativos são enviados
│   ├── .env.example        # Exemplo de variáveis de ambiente do backend
│   ├── package.json
│   └── server.js           # Arquivo principal do servidor Express
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Componentes React (Ex: DashboardGestor.jsx)
│   │   ├── context/
│   │   │   └── DataContext.jsx # Contexto global de dados e autenticação
│   │   ├── config/
│   │   │   └── constants.js  # Constantes do frontend
│   │   ├── App.jsx           # Definição das rotas (React Router)
│   │   └── main.jsx          # Ponto de entrada do React
│   ├── .env.example        # Exemplo de variáveis de ambiente do frontend
│   └── package.json
│
└── README.md               # Este arquivo
🚀 Aplicação em Produção (Links)O projeto está totalmente funcional e hospedado na nuvem:Frontend (Netlify): https://empatech2.netlify.app/Backend (Render): https://empatech-api.onrender.com/api⚙️ Como Executar o Projeto LocalmenteSiga este guia para configurar e executar a aplicação completa no seu computador.📌 Pré-requisitosAntes de começar, certifique-se de que tem os seguintes programas instalados:Node.js (versão LTS)GitVisual Studio Code (ou outro editor de código)PostgreSQL (Servidor de banco de dados)DBeaver ou PgAdmin (Gerenciador visual de banco de dados)1. Clonar o RepositórioPrimeiro, clone o repositório do GitHub para a sua máquina:git clone [https://github.com/BrenoColaneri/empatech-db.git](https://github.com/BrenoColaneri/empatech-db.git)
cd empatech-db
2. Configuração do Banco de Dados (PostgreSQL)Inicie o PostgreSQL: Garanta que o seu servidor PostgreSQL local está em execução.Crie o Banco de Dados: Use o DBeaver ou PgAdmin para se conectar ao seu servidor local (geralmente localhost:5432 com utilizador postgres e a senha que definiu na instalação).Crie uma nova base de dados. Recomendamos o nome empatech_db.Execute o Script SQL:No DBeaver/PgAdmin, abra um novo editor SQL para a base empatech_db.Encontre o script de criação das tabelas PostgreSQL no repositório (em documentos/).Copie, cole e execute o script SQL para criar todas as tabelas (Gestores, Equipes, etc.).Nota: O script de backup .sql (se disponível) também pode ser usado para importar a estrutura e os dados de uma vez.3. Configuração do Backend (Servidor)Navegue até a pasta backend:cd backend
Instale as dependências:npm install
Crie o arquivo .env:Crie um arquivo chamado .env dentro da pasta backend. Copie o conteúdo do backend/.env.example (ou use o exemplo abaixo) e preencha com as suas credenciais do PostgreSQL local.Exemplo de backend/.env:# URL de conexão do seu PostgreSQL local
DATABASE_URL=postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/empatech_db

# Segredo para os tokens JWT (pode ser qualquer string)
JWT_SECRET=meu_segredo_super_secreto_123

# URL do frontend (para o CORS)
FRONTEND_URL=http://localhost:5173
4. Configuração do Frontend (Aplicação React)Abra um novo terminal.Navegue até a pasta frontend:cd frontend
Instale as dependências:npm install
Crie o arquivo .env:Crie um arquivo chamado .env dentro da pasta frontend.Conteúdo do frontend/.env:VITE_API_URL=http://localhost:3001/api
(O seu backend (Passo 3) roda na porta 3001 por padrão)5. Executando a AplicaçãoTerminal 1 (Backend): Na pasta backend, inicie o servidor:npm start
(Você deverá ver a mensagem: ✅ Backend conectado ao PostgreSQL com sucesso!)Terminal 2 (Frontend): Na pasta frontend, inicie o cliente React:npm run dev
O seu navegador abrirá automaticamente em http://localhost:5173. A aplicação está totalmente funcional localmente!🔑 Documentação da APIA API é o "cérebro" do projeto. Ela lida com todos os dados e lógica de negócios.URL Base (Local): http://localhost:3001/apiURL Base (Produção): https://empatech-api.onrender.com/apiAutenticação (Bearer Token)Quase todos os endpoints da API são protegidos. Para acedê-los, é necessário enviar um Token de Autenticação (JWT) obtido no login.Fluxo de Autenticação (Ex: Postman):Faça o Login: Envie uma requisição POST para .../api/auth/login/gestor (ou .../grupo) com as suas credenciais.Receba o Token: A API responderá com um token.Use o Token: Para todas as outras requisições, vá para a aba "Authorization", selecione "Bearer Token" e cole o token.Endpoints da API1. Autenticação (/api/auth)POST /login/gestorDescrição: Autentica um gestor.Protegida: Não.Corpo (Body):{
    "email": "admin@empatech.com",
    "senha": "admin123"
}
Resposta (Sucesso 200):{
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": { "nome": "Admin Gestor", "tipo": "gestor" }
}
POST /login/grupoDescrição: Autentica uma equipa.Protegida: Não.Corpo (Body):{
    "nomeEquipe": "Equipe União",
    "senha": "senha123"
}
POST /register/grupoDescrição: (Protegida) Regista uma nova equipa (usado pelo Gestor).Protegida: Sim.Corpo (Body):{
    "nome": "Equipe Nova",
    "senha": "senhaNova123",
    "mentorNome": "Nome do Mentor",
    "mentorRa": "12345678",
    "mentorEmail": "mentor@email.com",
    "mentorTelefone": "11987654321"
}
2. Rota Pública (/api/public)GET /impactDescrição: Retorna os dados públicos de impacto (total de famílias, itens e dinheiro) para a Landing Page.Protegida: Não.Resposta (Sucesso 200):{
    "totalFamilias": "6",
    "totalItens": "25",
    "totalDinheiro": "500.00"
}
3. Rotas de Dados (Protegidas) (/api/...)Todas as rotas abaixo requerem um Bearer Token de autenticação.GET /equipesDescrição: Retorna a lista de todas as equipas.PUT /equipes/:idDescrição: Atualiza os dados de uma equipa específica.Exemplo de Corpo (Body):{
    "nome": "Equipe União (Editada)",
    "mentorNome": "Novo Nome",
    "mentorRa": "87654321",
    "mentorEmail": "novo@email.com",
    "mentorTelefone": "11912345678"
}
DELETE /equipes/:idDescrição: Exclui uma equipa e todos os seus membros (em cascata).GET /alunosDescrição: Retorna a lista de todos os alunos (integrantes) com o nome das suas equipas.POST /alunosDescrição: Regista um novo aluno (integrante) numa equipa.Exemplo de Corpo (Body):{
    "nome": "Novo Aluno",
    "ra": "11223344",
    "email": "aluno@email.com",
    "telefone": "11922223333",
    "equipe": "Equipe União" 
}
(Note que o backend procura a equipa pelo nome)POST /doacoesDescrição: Regista uma nova doação em dinheiro.Tipo de Requisição: form-data (não JSON), pois inclui um upload de arquivo.Campos (Form-Data):valor (Number)data (String, ex: "2025-11-10")doador (String)modo (String, ex: "PIX")equipe (String, nome da equipa)campanha_id (Number, opcional)comprovante (File, opcional)POST /transacoes-alimentosDescrição: Regista uma entrada ou saída de alimentos.Tipo de Requisição: form-data.Campos (Form-Data):tipo (String: "Entrada" ou "Saida")itens (String JSON, ex: [{"item":"Arroz (5kg)","qtd":10}])equipe (String, nome da equipa, obrigatório se tipo="Entrada")destino (String, nome da família, obrigatório se tipo="Saida")campanha_id (Number, opcional)notaFiscal (File, opcional)GET /familiasDescrição: Retorna a lista de todas as famílias registadas.POST /familiasDescrição: Regista uma nova família.Exemplo de Corpo (Body):{
    "nome": "Família Silva",
    "regiao": "Zona Leste"
}
GET /campanhas, POST /campanhasDescrição: Lê ou cria novas campanhas de arrecadação.GET /avisos, POST /avisosDescrição: Lê ou publica novos avisos no mural.GET /estoqueDescrição: Retorna a soma de todas as transações de alimentos, agrupadas por item.GET /historicoSaidasDescrição: Retorna um histórico detalhado de todas as saídas de alimentos para famílias.GET /doacoesDescrição: Retorna um histórico detalhado de todas as doações em dinheiro.🎲 Modelagem de Dados e DocumentosAbrir modelagem de dadosAbrir scripts para criação das tabelas🎬 Vídeo demonstrativoO vídeo demonstrativo está disponível no link a seguir: https://drive.google.com/file/d/1QcDmCTtbyJ8ytsx4OobmMN1AIscKjgGn/view?usp=sharing📋 Licença<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Empátech</a> © 2025 by <a href="https://www.linkedin.com/in/rafael-chagas-0648a6349/">Rafael Chagas Silva</a> is licensed under <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International</a>.🎓 Referênciashttps://github.com/iuricode/readme-templatehttps://github.com/gabrieldejesus/readme-modelhttps://chooser-beta.creativecommons.org/https://www.toptal.com/developers/gitignore