require('dotenv').config();
const express = require('express');
const clientesRoutes = require('./routes/clientes');
const cotacoesRoutes = require('./routes/cotacoes');
const boletosRoutes = require('./routes/boletos');
const tarefasRoutes = require('./routes/tarefas');

const app = express();
app.use(express.json());

app.use('/clientes', clientesRoutes);
app.use('/cotacoes', cotacoesRoutes);
app.use('/boletos', boletosRoutes);
app.use('/tarefas', tarefasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
