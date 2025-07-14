# Desafio MB

Este projeto consiste em uma aplicação de cadastro com frontend em Vue.js e backend em Node.js/Express.

## Requisitos

- Node.js (versão 18.20.4)
- NPM (gerenciador de pacotes do Node.js)

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- `app/` - Frontend em Vue.js
- `server/` - Backend em Node.js/Express

## Instalação

### Frontend (app)

1. Entre na pasta do frontend:

```bash
cd app
```

2. Instale as dependências:

```bash
npm install
```

3. Faça o build da aplicação:

```bash
npm run build
```

### Backend (server)

1. Entre na pasta do backend:

```bash
cd server
```

2. Instale as dependências:

```bash
npm install
```

## Executando o Projeto

1. Inicie o servidor backend:

```bash
cd server
npm start
```

2. Acesse a aplicação em seu navegador:

```
http://localhost:3000/registration
```

## Rotas Disponíveis

- `/registration` - Página principal da aplicação
- `/registration` (POST) - Endpoint para cadastro de usuários

## Funcionalidades

- Cadastro de pessoa física e jurídica
- Validação de formulários
- Máscaras para CPF, CNPJ e telefone
- Sistema de etapas (stepper) para melhor experiência do usuário
