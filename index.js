const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`localHost ouvindo a porta ${PORT}`);
});