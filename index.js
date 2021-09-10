const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// 1 - Crie um endpoint para o cadastro de produtos
// 2 - Crie um endpoint para listar os produtos
// 3 - Crie um endpoint para atualizar um produto
// 4 - Crie um endpoint para deletar um produto
// 5 - Crie um endpoint para cadastrar vendas
// 6 - Crie um endpoint para listar as vendas
// 7 - Crie um endpoint para atualizar uma venda
// 8 - Crie um endpoint para deletar uma venda
// 9 - Atualize a quantidade de produtos
// 10 - Valide a quantidade de produtos

// Bônus
// 11 - Escreva testes para seus models
// 12 - Escreva testes para seus services
// 13 - Escreva testes para seus controllers

app.listen(PORT, () => console.log('O APP está "ON !!!"'));
