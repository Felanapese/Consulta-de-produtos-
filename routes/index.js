const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Limites iguais aos do formulário (views/index.ejs) e das colunas (script.sql)
const MAX_NOME = 100;
const MAX_CATEGORIA = 80;
const MAX_DESCRICAO = 1000;
const MAX_PRECO = 99999999.99;
const MAX_QUANTIDADE = 2147483647;

// Busca todos os produtos no MySQL (os mais recentes primeiro)
async function buscarProdutos() {
  const [produtos] = await db.query(
    'SELECT id, nome, categoria, preco, quantidade, descricao FROM produtos ORDER BY id DESC'
  );
  return produtos;
}

// Busca os produtos e desenha a página (tabela + formulário)
async function renderizarPagina(
  res,
  { status = 200, mensagem = null, erroFormulario = null, dados = {} } = {}
) {
  const produtos = await buscarProdutos();
  res.status(status).render('index', {
    title: 'Cadastro de Produtos',
    produtos,
    mensagem,
    erroFormulario,
    dados,
  });
}

// Lê o que veio do formulário e tira os espaços das pontas
function lerFormulario(body) {
  const texto = (valor) => String(valor ?? '').trim();
  return {
    nome: texto(body.nome),
    categoria: texto(body.categoria),
    preco: texto(body.preco).replace(',', '.'),
    quantidade: texto(body.quantidade),
    descricao: texto(body.descricao),
  };
}

// Devolve a mensagem de erro, ou null se estiver tudo certo
function validar(dados) {
  if (!dados.nome || !dados.categoria || !dados.preco || !dados.quantidade || !dados.descricao) {
    return 'Preencha todos os campos.';
  }
  if (dados.nome.length > MAX_NOME) {
    return `O nome pode ter no máximo ${MAX_NOME} caracteres.`;
  }
  if (dados.categoria.length > MAX_CATEGORIA) {
    return `A categoria pode ter no máximo ${MAX_CATEGORIA} caracteres.`;
  }
  if (dados.descricao.length > MAX_DESCRICAO) {
    return `A descrição pode ter no máximo ${MAX_DESCRICAO} caracteres.`;
  }

  const preco = Number(dados.preco);
  if (!Number.isFinite(preco) || preco < 0 || preco > MAX_PRECO) {
    return `Informe um preço válido, entre 0 e ${MAX_PRECO}.`;
  }

  const quantidade = Number(dados.quantidade);
  if (!Number.isInteger(quantidade) || quantidade < 0 || quantidade > MAX_QUANTIDADE) {
    return 'Informe a quantidade como um número inteiro, de 0 em diante.';
  }

  return null;
}

// GET / (e GET /itens): busca todos os registros no MySQL e envia para a página
router.get(['/', '/itens'], async (req, res, next) => {
  try {
    const mensagem = req.query.sucesso === '1' ? 'Produto cadastrado com sucesso!' : null;
    await renderizarPagina(res, { mensagem });
  } catch (erro) {
    next(erro);
  }
});

// POST /itens: recebe o formulário, grava no MySQL e volta para a lista
router.post('/itens', async (req, res, next) => {
  const dados = lerFormulario(req.body);
  const erro = validar(dados);

  if (erro) {
    return renderizarPagina(res, { status: 400, erroFormulario: erro, dados }).catch(next);
  }

  try {
    // Os "?" são preenchidos pelo mysql2 de forma segura (protege contra SQL injection)
    await db.execute(
      'INSERT INTO produtos (nome, categoria, preco, quantidade, descricao) VALUES (?, ?, ?, ?, ?)',
      [dados.nome, dados.categoria, Number(dados.preco), Number(dados.quantidade), dados.descricao]
    );
  } catch (erroBanco) {
    console.error('Erro ao gravar o produto: ' + erroBanco.message);
    return renderizarPagina(res, {
      status: 500,
      erroFormulario: 'Não foi possível salvar o produto. Confira a conexão com o banco e tente de novo.',
      dados,
    }).catch(next);
  }

  res.redirect('/?sucesso=1');
});

module.exports = router;
