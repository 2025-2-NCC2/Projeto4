# Dashboard Beneficente — Protótipo (React + Vite + Tailwind)

Este projeto é um exemplo simples de **dashboard** para um projeto beneficente.
Ele roda no seu computador, sem servidor, e serve para treinar/visualizar.

## Passo a passo (bem detalhado)

### 1) Instalar o Node.js
- Abra o navegador (Chrome/Edge).
- Acesse: https://nodejs.org/
- Clique em **LTS** (a versão recomendada).
- Baixe e instale (só ir clicando "Next/Avançar" e aceitar).
- Quando terminar, reinicie o computador (opcional, mas ajuda).

### 2) Baixar este projeto
- Baixe o arquivo **charity-dashboard.zip** (se recebeu este arquivo, ótimo).
- Clique com o botão direito e **Extrair tudo** (ou use um programa como WinRAR/7zip).
- Você terá uma pasta chamada `charity-dashboard` com vários arquivos dentro.

### 3) Abrir no VS Code
- Abra o programa **Visual Studio Code**.
- Clique em **File > Open Folder...** e selecione a pasta `charity-dashboard`.
- No VS Code, encontre a aba **Terminal** (em cima) e clique em **New Terminal**.
- Vai abrir uma janelinha preta na parte de baixo.

### 4) Instalar as dependências
- No terminal, digite:
  ```
  npm install
  ```
- Aguarde terminar (aparece várias linhas baixando arquivos — é normal).

### 5) Rodar o projeto
- Ainda no terminal, digite:
  ```
  npm run dev
  ```
- O terminal mostrará um endereço parecido com:
  ```
  Local:   http://localhost:5173/
  ```
- Segure a tecla **Ctrl** no teclado e **clique** nesse endereço (ou copie e cole no navegador).
- Você verá o dashboard funcionando.

## O que dá para fazer
- **Ver indicadores**: valores do mês (dinheiro, alimentos recebidos, famílias atendidas).
- **Registrar entradas** de alimentos (aumenta o estoque).
- **Registrar saídas** de alimentos (diminui o estoque).
- **Registrar doações em dinheiro** (aparece no gráfico e no ranking de equipes).
- **Cadastrar equipes** (para usar nos formulários).
- **Gráfico** com a evolução das doações em dinheiro nos últimos meses.

> Observação: os dados ficam só na tela do navegador. Ao atualizar a página, voltam para os de exemplo.
Se quiser salvar de verdade, depois podemos ligar esse projeto com um banco de dados (ex.: Supabase, Firebase).

## Problemas comuns
- **Erro com Tailwind / estilos não aparecem**: confira se `tailwind.config.js` tem:
  ```js
  export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: { extend: {} },
    plugins: [],
  }
  ```
  E se o arquivo `src/index.css` tem:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
  E se `main.jsx` importa `./index.css`.

- **Porta ocupada** (5173): quando rodar `npm run dev`, o Vite escolhe outra porta automaticamente. É só clicar no link que aparecer no terminal.

- **"npm não é reconhecido"**: o Node.js pode não ter instalado corretamente. Reinstale pelo site e abra **um novo terminal** depois de instalar.

## Próximos passos (quando quiser evoluir)
- Adicionar **login** (administrador x voluntário).
- Criar páginas separadas (Estoque, Doações, Equipes, Relatórios).
- Salvar em banco de dados real.
- Exportar relatórios para PDF/Excel.
