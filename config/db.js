const path = require('path');
const mysql = require('mysql2/promise');

// Carrega usuário, senha e banco do arquivo .env (que não vai para o GitHub)
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Testa a conexão quando o servidor inicia e mostra o resultado no terminal
pool
  .getConnection()
  .then((conexao) => {
    console.log('Conexao com o MySQL OK (banco: ' + process.env.DB_NAME + ')');
    conexao.release();
  })
  .catch((erro) => {
    console.error('Nao foi possivel conectar ao MySQL: ' + erro.message);
  });

module.exports = pool;
