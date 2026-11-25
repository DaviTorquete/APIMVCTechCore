// routes/clienteRoutes.js
import { Router } from 'express';
import {
    getClientes,
    getClientePorCnpj,
    getMaiorCompra,
    getClientesPorGrupo,
    postCliente,
    putCliente,
    deleteCliente
} from '../controllers/clienteController.js';

const router = Router();

// Rotas específicas ficam antes da rota dinâmica /:cnpj.
router.get('/', getClientes);
router.get('/Vcompra/maior', getMaiorCompra);
router.get('/grupo/:grupo', getClientesPorGrupo);
router.get('/:cnpj', getClientePorCnpj);
router.post('/', postCliente);
router.put('/:cnpj', putCliente);
router.delete('/:cnpj', deleteCliente);

export default router;
