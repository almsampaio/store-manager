const express = require('express');

const app = express();

const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, ()=> console.log(`Server iniciado na porta ${PORT}`));