const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3001;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`API escutando na porta ${PORT}`));
