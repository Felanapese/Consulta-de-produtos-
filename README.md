# Consulta de Produtos

Aplicação web para cadastrar e consultar produtos (controle de estoque), feita com Node.js, Express, EJS e MySQL.

## Tema

Cadastro e consulta de produtos. Cada produto tem: id, nome, categoria, preço, quantidade em estoque e descrição.

## Integrantes

- Nome do integrante 1
- Nome do integrante 2

## Como instalar e executar

Pré-requisitos: [Node.js](https://nodejs.org) (versão LTS) e MySQL em execução no computador.

1. Clone o repositório e entre na pasta:

   no prompt de comando:
   git clone https://github.com/Felanapese/Consulta-de-produtos-.git
   cd Consulta-de-produtos-
   

2. Instale as dependências:

   no prompt de comando:
   npm install
   

3. Crie o banco e a tabela executando o `script.sql` (pelo terminal, MySQL Workbench ou phpMyAdmin):

   no prompt de comando:
   mysql -u root -p < script.sql
   

4. Crie o arquivo `.env` a partir do exemplo e preencha o usuário e a senha do seu MySQL:

   no prompt de comando:
   cp .env.example .env
   

   No Windows, use `copy .env.example .env`.

5. Inicie o servidor e abra http://localhost:3000 no navegador:

   no prompt de comando:
   npm start
   
