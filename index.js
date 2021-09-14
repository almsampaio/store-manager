const express = require('express');
const bodyParser = require('body-parser');

const { products, sales } = require('./routes');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);
app.use('/sales', sales);

app.use((err, _req, res, _next) => res.status(err.code).json({ message: err.message }));

const PORT = 3000;

app.listen(PORT, () => console.log(`Aplicação funcionando na porta ${PORT}`));
