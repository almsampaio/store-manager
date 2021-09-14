const express = require('express');
const bodyParser = require('body-parser');
const productControlle = require('./controllers/productControlle');
const validtion = require('./middleware/middleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validtion.isValidName, validtion.isValidQuanty, productControlle.addProduct);
app.get('/products', productControlle.findAll);
app.get('/products/:id', productControlle.findById);

app.listen(PORT, () => console.log(`On-line na porta ${PORT}`));
