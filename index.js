const express = require('express');
const bodyParser = require('body-parser');

const { products } = require('./routes');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);

const PORT = 3000;

app.listen(PORT, () => console.log(`Aplicação funcionando na porta ${PORT}`));
