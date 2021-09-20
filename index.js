const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(router);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`Servidor rodando na porta ${PORT}` ); });
