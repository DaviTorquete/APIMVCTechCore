// app.js - ponto de entrada da API TechCore
import express from 'express';
import clienteRoutes from './routes/clienteRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/clientes', clienteRoutes);

// Resposta padrão para caminhos que não existem.
app.use((req, res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Acesse http://localhost:${PORT}/clientes`);
});
