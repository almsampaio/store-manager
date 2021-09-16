const bodyParser = require('body-parser');

const express = require('express');

const app = express();

const PORTA = 3000;

app.use(bodyParser.json());

// Conectando o index.js com a camada Controllers
const produtosController = require('./controllers/produtosController');

app.get('/products', produtosController.listarProdutos);

app.get('/products/:id', produtosController.listarProdutosPorID);

app.post('/products', produtosController.criarProduto);

app.put('/products/:id', produtosController.atualizarProduto);

app.delete('/products/:id', produtosController.deletarProduto);

app.listen(PORTA, () => console.log('Servidor tá ON!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
