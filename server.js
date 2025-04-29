const express = require('express');
const app = express();
const mensagensRouter = require('./routes/mensagens');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/mensagens', mensagensRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
