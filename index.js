const bodyParser = require('body-parser');

const express = require('express');

const app = express();

const PORTA = 3000;

app.use(bodyParser.json());

// Conectando o index.js com a camada Controllers
const produtosController = require('./controllers/produtosController');
const vendasController = require('./controllers/vendasController');

app.get('/products', produtosController.listarProdutos);
app.get('/sales', vendasController.listarVendas);

app.get('/products/:id', produtosController.listarProdutosPorID);
app.get('/sales/:id', vendasController.listarVendaPorID);

app.post('/products', produtosController.criarProduto);
app.post('/sales', vendasController.criarVenda);

app.put('/products/:id', produtosController.atualizarProduto);
app.put('/sales/:id', vendasController.atualizarVenda);

app.delete('/products/:id', produtosController.deletarProduto);
app.delete('/sales/:id', vendasController.deletarVenda);

app.listen(PORTA, () => console.log('Servidor tá ON!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
