# FECAP - Fundação de Comércio Álvares Penteado

<p align="center">
<a href= "https://www.fecap.br/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP - Fundação de Comércio Álvares Penteado" border="0"></a>
</p>

# Lideranças Empáticas

## EmpáTech

## Integrantes: <a href="https://www.linkedin.com/in/breno-sales-colaneri-231b59322/">Breno Sales Colaneri</a>, <a href="https://www.linkedin.com/in/guilherme-le%C3%A3o-277053347/">Guilherme Leão Rodrigues</a>, <a href="www.linkedin.com/in/izabelliribeiro">Izabelli Ribeiro dos Santos</a>, <a href="https://www.linkedin.com/in/rafael-chagas-0648a6349/">Rafael Chagas Silva</a>
## Professores Orientadores: <a href="https://www.linkedin.com/school/fecap/posts/?feedView=all">Kátia Milani Lara Bossi</a>, <a href="https://www.linkedin.com/in/cristina-machado-corr%C3%AAa-leite-630309160/">Cristina Machado Correa Leite</a>, <a href="https://www.linkedin.com/in/francisco-escobar/">Francisco de Souza Escobar</a>, <a href="https://br.linkedin.com/in/dolemes">David de Oliveira Lemes</a>, <a href="https://www.linkedin.com/in/j%C3%A9sus-gomes-83b769108/">Jésus Gomes</a>

## Descrição

<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1DfU80iBe954nq0hGI9cydkUk_ooL4Hfu" alt="NOME DO JOGO" border="0">
  <br>
  
O nosso projeto tem como objetivo apoiar e otimizar a gestão do programa Lideranças Empáticas, uma iniciativa voltada à arrecadação e distribuição de cestas básicas para famílias em situação de vulnerabilidade social. Para isso, desenvolvemos uma plataforma digital que permite o controle organizado das doações recebidas, sejam elas em dinheiro ou em alimentos, e sua respectiva destinação. O sistema contempla dois tipos de acesso: o acesso do gestor, com funções administrativas completas, e o acesso do grupo, com permissões restritas voltadas ao apoio nas ações do projeto.

## 🛠 Estrutura de pastas

-Raiz<br>
|<br>
|-->documentos<br>
  &emsp;|-->antigos<br>
  &emsp;|Documentação.docx<br>
|-->imagens<br>
|-->src<br>
  &emsp;|-->Backend<br>
  &emsp;|-->Frontend<br>
|readme.md<br>

A pasta raiz contem dois arquivos que devem ser alterados:

<b>README.MD</b>: Arquivo que serve como guia e explicação geral sobre seu projeto. O mesmo que você está lendo agora.

Há também 4 pastas que seguem da seguinte forma:

<b>documentos</b>: Toda a documentação estará nesta pasta.

<b>executáveis</b>: Binários e executáveis do projeto devem estar nesta pasta.

<b>imagens</b>: Imagens do sistema

<b>src</b>: Pasta que contém o código fonte.

## 🛠 Instalação

Não há instalação!
Siga os passos a seguir e execute-o como uma página WEB (através de algum browser).

## 💻 Configuração para Desenvolvimento

Para abrir este projeto você necessita das seguintes ferramentas:

<a href="https://www.nodejs.tech/pt-br/download">Node.js</a>, <a href="https://code.visualstudio.com/download">VS Code</a>, <a href="https://dev.mysql.com/downloads/workbench/">MySQL Workbench</a>, <a href="https://www.apachefriends.org/pt_br/download.html">XAMPP</a>

Você pode acessar os arquivos do projeto na pasta abaixo:

👉 [Abrir pasta Dashboard 19-09](./dashboard%2019-09)

### Como fazer o download da pasta
1. Clique no link acima para abrir a pasta no GitHub.  
2. Clique no botão verde **Code** (canto superior direito).  
3. Escolha **Download ZIP** para baixar todos os arquivos do repositório.  
   - Caso queira apenas essa pasta, após extrair o ZIP, utilize somente a pasta `dashboard 19-09`.

## 🚀 Tutorial para rodar o projeto

### 1. Banco de Dados (MySQL via XAMPP)
1. Habilite o **MySQL** no painel do **XAMPP**.  
2. Abra o **MySQL Workbench** (ou outro cliente MySQL).  
3. Crie uma **nova conexão**.  
4. Vá até o **Server** e escolha **Import Data**.  
5. Importe a pasta **MySQL** que está dentro da pasta `dashboard 19-09`.  
6. Crie a **database** necessária conforme os arquivos importados.  


### 2. Configuração do PowerShell e execução do projeto
No **PowerShell**, rode:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Depois, no VSCode, abra a pasta do projeto, que no caso é o `dashboard 19-09` e siga esta ordem de comandos abrindo o terminal no VS Code:

### Instalar dependências
```powershell
npm install
```

### Entrar na pasta backend e rodar o servidor
```powershell
cd backend
npm start
```

### Em outro terminal, voltar para a pasta dashboard e rodar o front-end
```powershell
npm run dev
```

### 3. Acessar o projeto
Após o passo acima, o projeto estará disponível no navegador em:

👉 http://localhost:5173

## 📋 Licença/License
<a href="https://creativecommons.org/licenses/by/4.0/">Empátech</a> © 2025 by <a href="https://creativecommons.org/licenses/by/4.0/">Rafael</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;">
## 🎓 Referências

Aqui estão as referências usadas no projeto.

1. <https://github.com/iuricode/readme-template>
2. <https://github.com/gabrieldejesus/readme-model>
3. <https://chooser-beta.creativecommons.org/>
5. <https://www.toptal.com/developers/gitignore>
