const express = require('express');
const bodyParser = require('body-parser');
const router = require('./controllers/ProductsController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', router);

const PORT = 3000;

app.listen(PORT, () => console.log(`listering on port ${PORT}`));
