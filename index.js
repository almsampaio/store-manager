const express = require('express');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

require('./controllers/productController')(app);

const PORT_DEFAULT = 3000;
const PORT = process.env.PORT || PORT_DEFAULT;

app.listen(PORT, () => {
  console.log('Servidor Online');
});
