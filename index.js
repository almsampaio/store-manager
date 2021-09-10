const express = require('express');

const app = express();
const SERVER_PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products');

app.listen(SERVER_PORT, () => console.log(`Servidor rodando na porta: ${SERVER_PORT}`));
