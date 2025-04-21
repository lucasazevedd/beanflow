require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Rotas
const clientesRoutes = require('./routes/clientes');
// const cotacoesRoutes = require('./routes/cotacoes');
// const boletosRoutes = require('./routes/boletos');
// const tarefasRoutes = require('./routes/tarefas');

const app = express();

// Middlewares
app.use(cors()); // Libera o acesso ao frontend do Lucas
app.use(express.json()); // Permite receber JSON no body das requisições

// Rotas da aplicação
app.use('/clientes', clientesRoutes);
// app.use('/cotacoes', cotacoesRoutes);
// app.use('/boletos', boletosRoutes);
// app.use('/tarefas', tarefasRoutes);

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});


